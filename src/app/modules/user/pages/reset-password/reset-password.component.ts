import { Component,  OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCred } from '../../models/user';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  constructor(private route: ActivatedRoute, private auth:AuthService, private router: Router){}
  id!:number
  ngOnInit(): void {
    this.id = +this.route.snapshot.queryParams['id']

    this.resetPasswordForm.valueChanges.subscribe(frm => {
      const password = frm.password;
      const confirm = frm.confirmPassword;
      if (password !== confirm) {
        this.resetPasswordForm.get('confirmPassword')?.setErrors({ notMatched: true });
      }
      else {
        this.resetPasswordForm.get('confirmPassword')?.setErrors(null);
      }
    });
  }


  resetPasswordForm = new FormGroup({
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('',[Validators.required] ),
  })


  

  getErrorMessagePass(){
    if(this.resetPasswordForm.get('password')!.errors?.['required']){
      return 'Cannot be empty'
    }else if(this.resetPasswordForm.get('password')!.errors){
      return 'Password must be at least 6 characters long'
    }
    return ''
  }

  getErrorMessageVerPass(){
    if(this.resetPasswordForm.get('confirmPassword')!.errors?.['required']){
      return 'Cannot be empty'
    }else if(this.resetPasswordForm.get('confirmPassword')!.errors?.['notMatched']){
      return 'Password did not match'
    }
    return ''
  }

  showPassword(){
    console.log('showPassword')
  }
  onSubmit(){
    this.auth.getUserCred(this.id).subscribe(cred =>{
      let userC:UserCred = {
        id : cred.id,
        username: cred.username,
        password: this.resetPasswordForm.value.password as string,
        active : cred.active,
        role: cred.role
      }

      this.auth.updateUserCred(userC).subscribe()
      alert('Password updated successfully')
      this.router.navigate(['profile/login'])
    }
      
    )
  }
}
