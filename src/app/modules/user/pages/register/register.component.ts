import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { User, UserCred } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user?: User;

  registerForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.pattern(/^[^\s@]+@[^\s@%]+\.[^\s@]+$/), Validators.required]],
  });

  constructor(private fb: FormBuilder,
    private userSvc: UserService,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    
    const userCred: UserCred = {
      username: this.username.value,
      password: this.password.value,
      active: true,
      role: 'USER'
    };
    
    const user: User = {
      key: 0,
      username: this.username.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      phone: '',
      birthDate: '',
      address: ''
    }

    this.userSvc.registerUser(user, userCred).pipe(
      switchMap(() => {
        const data: { username: string, password: string } = {
          username: userCred.username,
          password: userCred.password
        }
        return this.auth.login(data);
      })
    ).subscribe(user => {
      if (user) {
        this.snackBar.open(`Welcome to Grey Space, ${user.firstName}!`, '', { duration: 3500 });
        this.router.navigate(['/home']);
      }
    });
  }

  get username(): FormControl {
    return this.registerForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get firstName(): FormControl {
    return this.registerForm.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.registerForm.get('lastName') as FormControl;
  }

  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get phone(): FormControl {
    return this.registerForm.get('phone') as FormControl;
  }

  get birthDate(): FormControl {
    return this.registerForm.get('birthDate') as FormControl;
  }

  get address(): FormControl {
    return this.registerForm.get('address') as FormControl;
  }

}