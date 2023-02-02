import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  loginAsAdmin?: boolean;
  unsuccessful: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {

  }


  ngOnInit(): void {
    const admin: string | null = this.route.snapshot.paramMap.get('id');
    this.loginAsAdmin = (admin === 'admin');
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.auth.isLoggedIn$.pipe(
      switchMap(isLoggedAsUser => {
        if (isLoggedAsUser) {
          return of(this.router.parseUrl('/home'));
        } else {
          return this.auth.isLoggedAsAdmin$.pipe(
            map(isLoggedAsAdmin => {
              return (isLoggedAsAdmin) ? this.router.parseUrl('/admin') : null;
            })
          )
        }
      })
    ).subscribe(url => {
      if (url) {
        this.router.navigateByUrl(url);
      }
    });
  }

  onSubmit(): void {
    const data = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
      remember: this.loginForm.get('remember')?.value
    }

    if (this.loginAsAdmin) {
      this.auth.loginAsAdmin(data).subscribe((admin) => {
        if (!admin) {
          this.unsuccessful = true;
          this.loginForm.reset();
        } else {
          this.notifyUser();
        }
      });
    } else {
      this.auth.login(data).subscribe((user) => {
        if (!user) {
          this.unsuccessful = true;
          this.loginForm.reset();
        } else {
          this.notifyUser();
        }
      });
    }
  }

  notifyUser(): void {
    this.snackBar.open('You are logged in.', '', {
      duration: 1000, verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  get username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

}