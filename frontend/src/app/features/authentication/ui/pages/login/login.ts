import { Component, computed, signal } from '@angular/core';
import { Logo } from "../../../../../shared/components/logo/logo";
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { LoginRegisterFrame } from '../../components/login-register-frame/login-register-frame';
import { Router } from '@angular/router';
import { LoginFormData } from '../../../domain/form-interfaces/login';
import { form, required, FormField } from '@angular/forms/signals';

@Component({
  selector: 'login',
  imports: [MatFormField, MatInput, MatLabel, LoginRegisterFrame, MatError, FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private router:Router)
  {


  }

  formModel=signal<LoginFormData>({
    login:"",
    password:""

  });

  loginForm=form(this.formModel,
    (schemaPath)=>{
        required(schemaPath.login,{message:"field required"});
        required(schemaPath.password,{message:"field required"})
    })

  loginErrorMessage=computed(()=>{ 
    return this.loginForm.login().errors()[0]?.message || "";
  })
  
  passwordErrorMessage=computed(()=>{ 
    return this.loginForm.password().errors()[0]?.message || "";
  })


  onLoginButtonClicked()
  {
      console.log("LOGIN!")
  }

  onSwitchToRegisterPageButtonClicked()
  {
      
      this.router.navigate(["register"])
  }
}
