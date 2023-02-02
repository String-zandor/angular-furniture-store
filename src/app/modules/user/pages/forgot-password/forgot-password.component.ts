import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MailService } from '../../services/mail.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private mailService: MailService,
    private authServ: AuthService, public dialog: MatDialog,
    private router: Router) {

  }

  ngOnInit(): void { }

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  otpForm = new FormGroup({
    otp: new FormControl('', [Validators.required])
  })

  timer: boolean = false
  invalidOTP: boolean = false;
  sendOtpAgain: boolean = true
  timeDisp: number = 15
  showOtpUi: boolean = false
  email: string = ''


  onSubmit() {
    this.timeDisp = 15;
    this.mailService.sendOneTimePasswordMail(this.forgotPasswordForm.value.email as string)
    this.timer = true
    this.sendOtpAgain = false
    this.showOtpUi = true
    this.email = this.forgotPasswordForm.value.email as string
    this.startTimer()
  }


  getErrorMessage() {
    if (this.forgotPasswordForm.get('email')!.errors?.['required']) {
      return 'You must enter a value'
    } else if (this.forgotPasswordForm.get('email')!.errors?.['email']) {
      return 'Not a valid email'
    }

    return ''
  }


  startTimer() {

    setInterval(() => {
      if (this.timeDisp > 0) {
        this.timeDisp--;
      } else {
        this.timer = false
        this.sendOtpAgain = true
        return
      }
    }, 1000)
  }

  verifyOtp() {
    let a: boolean = false
    this.authServ.verifyEmail(this.email).pipe(

      switchMap(user => {
        if (user) {
          return this.authServ.verifyOtp(user)
        } else {
          return of(null)
        }
      })
    ).subscribe(result => {
      if (result && this.otpForm.get('otp')?.value === result.otp) {
        this.invalidOTP = false;
        this.router.navigate(['reset-password'], { queryParams: { id: result.id } });
      } else {
        this.invalidOTP = true;
      }
    })

  }

}
