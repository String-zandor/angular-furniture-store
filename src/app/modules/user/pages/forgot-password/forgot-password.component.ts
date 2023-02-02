import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MailService } from '../../services/mail.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  
  constructor(private mailService: MailService, private authServ:AuthService, public dialog:MatDialog, private router:Router){ }

  ngOnInit(): void { }

  forgotPasswordForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email])
  })

  otpForm = new FormGroup({
    otp: new FormControl('',[Validators.required])
  })

  timer:boolean = false
  sendOtpAgain:boolean = true
  timeDisp:number = 15
  showOtpUi:boolean = false
  email:string = ''


  onSubmit(){
    console.log('sending email to uzer...')
    // this.mailService.sendOneTimePasswordMail(this.forgotPasswordForm.value.email as string)
    this.timer=true
    this.sendOtpAgain=false
    this.showOtpUi = true
    this.email = this.forgotPasswordForm.value.email as string
    this.startTimer()
  }

  
  getErroMessage(){
    if(this.forgotPasswordForm.get('email')!.errors?.['required']){
      return 'You must enter a value'
    }else if(this.forgotPasswordForm.get('email')!.errors?.['email']){
      return 'Not a valid email'
    }

    return ''
  }
  // getErrorOtp(){
  //   if(this.otpForm.get(''))
  // }

  
  startTimer(){
    
    setInterval(() => {
      if(this.timeDisp > 0) {
        this.timeDisp--;
      } else {
        this.timer = false
        this.sendOtpAgain=true
        return
      }
    },1000)
  }

  verifyOtp(){
    let a:boolean =false
    this.authServ.verifyEmail(this.email).pipe(

      switchMap(user => {
        if(user){
          return this.authServ.verifyOtp(user)
        }else{
          return of(null)
        }
      }),
      tap (console.log),
      // map(otp => this.otpForm.get('otp')?.value === otp.otp)
    ).subscribe(result => {
      if(this.otpForm.get('otp')?.value === result.otp){
        //if otp mathce
        // [routerLink]="['/products']"
        // [queryParams]="{ order: 'popular'}"
        this.router.navigate(['reset-password'], {queryParams: {id:result.id}});
        
      }else{
        this.openDialog()
      }
    })
    
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogOtp)
  }
  

}
  /**
 * Dialogbox when otp
 */
  @Component({
    selector: 'otp-message-dialog',
    templateUrl: './otp-message-dialog.html',
    styleUrls: ['./otp-message-dialog.scss'],
  })
  export class DialogOtp{
    constructor(public dialogRef: MatDialogRef<DialogOtp>){}
    
    onOkClick(): void {
      console.log("ok")
      this.dialogRef.close();
    }
  }
