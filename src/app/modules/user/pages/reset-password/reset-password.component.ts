import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) {

  }
  id!: number
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
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  })

  getErrorMessagePass() {
    if (this.resetPasswordForm.get('password')!.errors?.['required']) {
      return 'Cannot be empty'
    } else if (this.resetPasswordForm.get('password')!.errors) {
      return 'Password must be at least 6 characters long'
    }
    return ''
  }

  getErrorMessageVerPass() {
    if (this.resetPasswordForm.get('confirmPassword')!.errors?.['required']) {
      return 'Cannot be empty'
    } else if (this.resetPasswordForm.get('confirmPassword')!.errors?.['notMatched']) {
      return 'Password did not match'
    }
    return ''
  }
  
  onSubmit() {
    this.auth.getUserCred(this.id).pipe(
      map(cred => {
        cred.password = this.resetPasswordForm.value.password as string;
        return cred;
      }),
      switchMap(cred => this.auth.updateUserCred(cred))
    ).subscribe(() => {
      this.snackBar.open('Password successfully changed.', '', {
        duration: 1000, verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      this.auth.afterResetPass();
      this.router.navigate(['profile/login'])
    }

    )
  }

}
