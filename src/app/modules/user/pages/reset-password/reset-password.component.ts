import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  constructor(){
  }
  resetPasswordForm = new FormGroup({
    password: new FormControl('')
  })
  showPassword(){
    console.log('showPassword')
  }
  onSubmit(){
    console.log('awit')
  }
}
