import { Component, computed, Signal, signal } from '@angular/core';
import { LoginRegisterFrame } from '../../components/login-register-frame/login-register-frame';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { HANDYMAN_TYPES } from '../../../../../core/constants/handyman-types';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { UserTypes } from '../../../../../core/enums/user-type';
import { RegisterFormData } from '../../../domain/form-interfaces/register';

@Component({
  selector: 'register',
  imports: [LoginRegisterFrame,MatFormField, MatInput,MatLabel, MatOption,MatSelect, FormField],
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

  registerForm=form(this.formModel);
  isHandyman:Signal<boolean>=computed(()=>this.formModel().userType==UserTypes.handyman)

  onRegisterButtonClicked()
  {
      console.log("REGISTER!")
      
  }

  onSwitchToLoginPageButtonClicked()
  {
      this.router.navigate(['login']);
  }
}
