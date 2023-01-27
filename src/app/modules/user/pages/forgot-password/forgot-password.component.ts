import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm:FormGroup
  
  constructor(private formBuilder: FormBuilder){
    this.forgotPasswordForm = this.formBuilder.group({
      email:['']
    })
  }

  onSubmit(){
    console.log('awit')
  }
}
