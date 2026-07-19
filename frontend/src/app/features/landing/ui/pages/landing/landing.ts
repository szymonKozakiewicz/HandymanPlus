import { Component } from '@angular/core';
import { Logo } from '../../../../../shared/components/logo/logo';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatFabButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [Logo,MatFormField,MatInput,MatLabel, MatButton,MatFabButton],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

  constructor(private router: Router) {}

  onSignInClicked(event:MouseEvent):void
  {
    this.router.navigate(['login']);

  }
  
}
