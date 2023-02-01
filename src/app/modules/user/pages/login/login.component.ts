import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    remember: [false]
  });

  loginAsAdmin?: boolean;
  unsuccessful: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const admin: string | null = this.route.snapshot.paramMap.get('id');
    this.loginAsAdmin = (admin === 'admin');
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {

    this.auth.isLoggedIn$.pipe(
      //test
      tap(bool => console.log('is logged as user? ', bool)),
      switchMap(isLoggedAsUser => {
        if (isLoggedAsUser) {
          return of(this.router.parseUrl('/home'));
        } else {
          return this.auth.isLoggedAsAdmin$.pipe(
            //test
            tap(bool => console.log('is logged as admin? ', bool)),
            map(isLoggedAsAdmin => {
              return (isLoggedAsAdmin) ? this.router.parseUrl('/admin') : null;
            })
          )
        }
      })
    ).subscribe(url => {
      if (url) { 
        console.log(this.router.serializeUrl(url));
        this.router.navigateByUrl(url); 
      }
    });
    
      // this.auth.isLoggedIn$.subscribe(isLoggedIn => {
      //   if (isLoggedIn) {
      //     this.router.navigate(['home']);
      //   }
      // })
    

    
      // this.auth.isLoggedAsAdmin$.subscribe(isLoggedIn => {
      //   if (isLoggedIn) {
      //     this.router.navigate(['admin']);
      //   }
      // })
    
  }

  onSubmit(): void {
    const data = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
      remember: this.loginForm.get('remember')?.value
    }

    //for snackbar
      // this.snackBar.open('Message', 'Undo', {
      //   duration: 3000
      // });

    if (this.loginAsAdmin) {
      this.auth.loginAsAdmin(data).subscribe((admin) => {
        if (!admin) {
          this.unsuccessful = true;
          this.loginForm.reset();
        }
      });
    } else {
      this.auth.login(data).subscribe((user) => {
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
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

}
