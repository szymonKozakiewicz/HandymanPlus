import { Component, input, output } from '@angular/core';
import { Logo } from '../../../../../shared/components/logo/logo';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'login-register-frame',
  imports: [Logo,MatButton],
  templateUrl: './login-register-frame.html',
  styleUrl: './login-register-frame.css',
})
export class LoginRegisterFrame {
  
  switchModeButtonText=input<string>();
  mainActionButtonText=input<string>();
  switchModeButtonClicked=output<void>();
  mainActionButtonClicked=output<void>();

  constructor(private router:Router)
  {

  }
  

  onSwitchModeButtonClicked()
  {
    
    this.switchModeButtonClicked.emit();
  }


  onMainActionButtonClicked()
  {
    this.mainActionButtonClicked.emit();
  }

  onBackToLandingClicked()
  {
    this.router.navigate([""]);
  }

}
