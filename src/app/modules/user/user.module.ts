import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatInputModule, MatButtonModule, MatDividerModule
  ]
})
export class UserModule { }
