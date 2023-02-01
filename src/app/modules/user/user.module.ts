import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { UserRoutingModule } from './user-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { OrderModule } from "../order/order.module";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SharedModule } from "../../shared/shared.module";




@NgModule({
    declarations: [
        LoginComponent,
        ProfileComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        ConfirmDialogComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule,
        MatInputModule, MatButtonModule, MatDividerModule,
        OrderModule, MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        SharedModule
    ]
})
export class UserModule { }
