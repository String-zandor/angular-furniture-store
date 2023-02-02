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
    username: 'api',
    key: '41a6cac0704b4d36c4ae7618975397f2-75cd784d-08246ccb'
  })

  
  userid!:number

  async sendOneTimePasswordMail(email:string){

    let emailPresent = await this.getEmailPresentResult(email)

    if(!emailPresent){
      console.log('email not present',emailPresent,this.userid)
      return
    }
    console.log('emailpresent ',emailPresent,this.userid,email)
    let otp = this.getOneTimePassword()
    
    this.mg.messages
    .create('sandbox2934a2c85ebf413688f4f41cb32e413c.mailgun.org', {
      from: "Grey Space <admin@GreySpace.com>",
      to: [email],
      subject: "Grey Space - Password Reset OTP",
      html: "<h1>Verification Code</h1><br>"+
      "<p>Please use the verification code below to sign in.</p><br>"+` <h2> ${otp}</h2>`+"<p> If you didn’t request this, you can ignore this email.</p><br><p> Thanks,</p><p> Grey Space Team</p>"
    })
    .then(msg => {console.log(msg), this.saveOtpIntoDatabase(this.userid, otp)}) // logs response data
    .catch(err => (console.log(err.message), alert("'"+email+"' is not added as recepient")));
    
    console.log(this.mailgun)
  }

  getOneTimePassword(){
    let otp = ''
    const otp_len = 6
    while(otp.length <= otp_len){
      let digit = Math.floor(Math.random() * 11);
      otp += digit.toString()
    }
    //save into database

    return otp
  }

  saveOtpIntoDatabase(userid:number, otp:string):void{
    let otpData:OneTimePassword = {
      id: userid,
      otp: otp
    }
    this.http.put<OneTimePassword>(`${this.serverUrl}/otp/${userid}`, otpData).subscribe(
      {next: result => this.handleResult(result), error: () => this.handleError(otpData)}
    )
  }

  handleResult = (data:any) => {
    // success in adding otp in database
    console.log('successfully saved otp in database')
  };
  
  handleError = (otpData:OneTimePassword) => {
    //if no record 
    this.http.post<OneTimePassword>(`${this.serverUrl}/otp`, otpData).subscribe()
  };

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.serverUrl}/users`);
  }

  getEmailPresentResult(email:string){
    return new Promise(resolve => {
      this.getUsers().subscribe(data => {
        let result:boolean =false
        data.forEach((data:User)=>{
          if(data.email === email){
            result = true
            this.userid = data.id as number
          }
        })
        resolve(result)
      })
    })
  }

  
}
