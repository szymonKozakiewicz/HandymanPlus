import { Component } from '@angular/core';
import { Logo } from "../../../../../shared/components/logo/logo";
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { LoginRegisterFrame } from '../../components/login-register-frame/login-register-frame';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  imports: [ MatFormField, MatInput, MatLabel,LoginRegisterFrame],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private router:Router)
  {

  }

  onLoginButtonClicked()
  {
      console.log("LOGIN!")
  }

  onSwitchToRegisterPageButtonClicked()
  {
      
      this.router.navigate(["register"])
  }
}
