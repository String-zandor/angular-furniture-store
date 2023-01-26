import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

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
  sub?: Subscription; 

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    const admin: string | null = this.route.snapshot.paramMap.get('id');
    this.loginAsAdmin = (admin === 'admin');
    this.sub = this.auth.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['home']);
      }
    });
  }

  /**
   * TODO: implement admin login for this method
   */
  onSubmit(): void {
    const username: string = this.loginForm.get('username')?.value;
    const password: string = this.loginForm.get('password')?.value;

    if (this.loginAsAdmin) {
      //TEST
      console.log('log in as admin not yet implemented')
    } else {
      this.auth.login(username, password).subscribe((user) => {
        if (!user) {
          this.unsuccessful = true;
          this.loginForm.reset();
        }
      });
    }
  }

  get username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
