import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar){

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
    this.snackBar.open('Account registered.', '', {
      duration: 500
    });
  }
  
}
