import { Component, computed, Signal, signal } from '@angular/core';
import { LoginRegisterFrame } from '../../components/login-register-frame/login-register-frame';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { HANDYMAN_TYPES } from '../../../../../core/constants/handyman-types';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, required, SchemaPath, validate } from '@angular/forms/signals';
import { UserTypes } from '../../../../../core/enums/user-type';
import { Q } from '@angular/cdk/keycodes';
import { RegisterFormData } from '../../../models/form-interfaces/register';

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
      validate(schemaPath.repeatPassword,({value,valueOf})=>{
        if(value()!== valueOf(schemaPath.password))
        {
          return {
            kind: 'passwordMismatch',
            message: 'Passwords do not match',
          }
        }
        return null
      });
      required(schemaPath.login,{message:"login is required"});
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


  onRegisterButtonClicked()
  {
      
      this.router.navigate(['operation-status'])
  }

  onSwitchToLoginPageButtonClicked()
  {
      this.router.navigate(['login']);
  }
}
