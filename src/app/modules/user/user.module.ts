import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { RegisterComponent } from './pages/register/register.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { OrderModule } from "../order/order.module";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

//for html
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ConfirmDialogComponent,
    RegisterComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatInputModule, MatButtonModule, MatDividerModule,
    OrderModule, MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,MatSnackBarModule
  ]
})
export class UserModule { }
