import { Component, computed, inject, Signal, signal } from '@angular/core';
import { LoginRegisterFrame } from '../../components/login-register-frame/login-register-frame';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { HANDYMAN_TYPES } from '../../../../../core/constants/handyman-types';
import { ReactiveFormsModule } from '@angular/forms';
import { debounce, form, FormField, minLength, required, SchemaPath, SchemaPathTree, validate, validateHttp } from '@angular/forms/signals';
import { UserTypes } from '../../../../../core/enums/user-type';
import { Q } from '@angular/cdk/keycodes';
import { RegisterFormData } from '../../../models/form-interfaces/register';
import { RegisterUseCase } from '../../../use-case/register';
import { RegisterRequest } from '../../../api/dto/register-request';
import { LoginCheckResponse } from '../../../api/dto/login-check-response';
import { AUTH_API_ENDPOINTS } from '../../../config/auth-api-endpoints';


@Component({
  selector: 'register',
  imports: [LoginRegisterFrame, MatFormField, MatInput, MatLabel, MatOption, MatSelect, FormField, MatError],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {


  constructor(private router:Router)
  {

  }


  handymanTypes=HANDYMAN_TYPES;
  registerUserUseCase=inject(RegisterUseCase)

  userTypes=[
    {value:UserTypes.client},
    {value:UserTypes.handyman}
    
  ];

  formModel=signal<RegisterFormData>(
    {
      login: "",
      password: "",
      repeatPassword: "",
      userType:UserTypes.client,
      handymanType: this.handymanTypes[0]

    }
  );
  

  registerForm=form(this.formModel,
    (schemaPath)=>{
      validate(schemaPath.repeatPassword,this.validateIsRepeatPasswordSameAsPassword(schemaPath));

      required(schemaPath.login,{message:"login is required"});
      debounce(schemaPath.login,400);
      validateHttp(schemaPath.login,{
        request:this.createLoginCheckRequest(),
        onError:this.handleLoginCheckExistanceError,
        onSuccess:this.handleSuccessCheckExistanceError
        
      })
      

      required(schemaPath.userType,{message:"userType is required"});
      required(schemaPath.password,{message:"password is required"});
      required(schemaPath.repeatPassword,{message:"field is required"});

    }
  );
  isHandyman:Signal<boolean>=computed(()=>this.formModel().userType===UserTypes.handyman)
  passwordError=computed(()=>{
    let inputToUpdate=this.registerForm.password();
    return this.getErrorMessageOfInput(inputToUpdate);
    
  });
  passwordRepeatError=computed(()=>{
    let inputToUpdate=this.registerForm.repeatPassword();
    return this.getErrorMessageOfInput(inputToUpdate);
    
  });

  loginError=computed(()=>{
      let inputToUpdate=this.registerForm.login();
      return this.getErrorMessageOfInput(inputToUpdate);
    }
    

  )


  getErrorMessageOfInput(inputToUpdate:any)
  {

    if(inputToUpdate.invalid())
    {
      return inputToUpdate.errors()[0]?.message || "something is wrong";
    }
    return ""
  }

  validateIsRepeatPasswordSameAsPassword(schema:SchemaPathTree<RegisterFormData>)
  {
    return(
      {value,
        valueOf,
      }:{value:()=>string,
        valueOf:(path:SchemaPath<string>)=>string
      }
    )=>
    {
        if(value()!== valueOf(schema.password))
        {
          return {
            kind: 'passwordMismatch',
            message: 'Passwords do not match',
          }
        }
        return null
    }
  }

  createLoginCheckRequest()
  {
    return ({value}:{value:()=>string})=>{
      if(!(value()))
      {
        return undefined;
      }
      return AUTH_API_ENDPOINTS.loginCheckValidation+"?login="+encodeURIComponent(value());
    }
  }

  handleLoginCheckExistanceError(error:unknown)
  {
    return{
      kind:"serverError",
      message:"Sorry, server not respoding"
    }
  }

  handleSuccessCheckExistanceError(response:LoginCheckResponse)
  {
    if(response.isLoginAvaiable)
    {
      return null;
    }
    else{
      return{
        kind:"badLogin",
        message:"this login name is already taken"
      }
    }
  }


  onRegisterButtonClicked()
  {
    let modelData:RegisterFormData=this.formModel();
    let request=new RegisterRequest(modelData);
    this.registerUserUseCase.execute(request);
    this.router.navigate(['operation-status'])

  }

  onSwitchToLoginPageButtonClicked()
  {
      this.router.navigate(['login']);
  }
}
