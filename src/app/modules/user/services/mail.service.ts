import { Injectable } from '@angular/core';
import Mailgun from 'mailgun.js'
import * as formData from 'form-data'
import { HttpClient } from '@angular/common/http';
import { OneTimePassword } from '../models/one-time-password';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class MailService {
  serverUrl: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  mailgun = new Mailgun(formData)

  mg = this.mailgun.client({
    username: 'insert-api-username-here',
    key: 'insert-api-key-here'
  })

  userid!: number

  async sendOneTimePasswordMail(email: string) {
    let emailPresent = await this.getEmailPresentResult(email)

    if (!emailPresent) {
      return
    }
    let otp = this.getOneTimePassword()

    this.mg.messages
      .create('insert-mailgun-email-here', {
        from: "Grey Space <noreply@GreySpace.com>",
        to: [email],
        subject: "Grey Space - Password Reset OTP",
        html: "<h1>Verification Code</h1><br>" +
          "<p>Please use the verification code below to sign in.</p><br>" + ` <h2> ${otp}</h2>` + "<p> If you didn’t request this, you can ignore this email.</p><br><p> Thanks,</p><p> Grey Space Team</p>"
      })
      .then(msg => { this.saveOtpIntoDatabase(this.userid, otp) })
      .catch(err => console.log(err));
  }

  getOneTimePassword() {
    let otp = ''
    const otp_len = 6
    while (otp.length <= otp_len) {
      let digit = Math.floor(Math.random() * 11);
      otp += digit.toString()
    }
    return otp
  }

  saveOtpIntoDatabase(userid: number, otp: string): void {
    let otpData: OneTimePassword = {
      id: userid,
      otp: otp
    }
    this.http.put<OneTimePassword>(`${this.serverUrl}/otp/${userid}`, otpData).subscribe(
      { next: result => this.handleResult(result), error: () => this.handleError(otpData) }
    )
  }

  handleResult = (data: any) => {
    // success in adding otp in database
  };

  handleError = (otpData: OneTimePassword) => {
    //if no record 
    this.http.post<OneTimePassword>(`${this.serverUrl}/otp`, otpData).subscribe()
  };

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.serverUrl}/users`);
  }

  getEmailPresentResult(email: string) {
    return new Promise(resolve => {
      this.getUsers().subscribe(data => {
        let result: boolean = false
        data.forEach((data: User) => {
          if (data.email === email) {
            result = true
            this.userid = data.id as number
          }
        })
        resolve(result)
      })
    })
  }
}
