import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  constructor(private formBuilder: FormBuilder){
    this.resetPasswordForm = this.formBuilder.group({
      password:[''],
      passwordConfirm:['']
    })
  }
  showPassword(){
    console.log('showPassword')
  }
  onSubmit(){
    console.log('awit')
  }
}
