import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  hide=true;
  user?: User;

  registerForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.pattern(/^[^\s@]+@[^\s@%]+\.[^\s@]+$/)],
    phone: [''],
    birthDate: [new Date()],
    address: ['']
  })

  constructor(private fb: FormBuilder, private userSvc: UserService, private router: Router){}
 
  ngOnInit(): void {
    
  }

  onSubmit(): void {
    const data = {
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
      phone: this.registerForm.get('phone')?.value,
      birthDate: this.registerForm.get('birthDate')?.value,
      address: this.registerForm.get('address')?.value
    }
  }

  register(): void {
    if (this.user) {
      this.user.firstName = this.firstName.value;
      this.user.lastName = this.lastName.value;
      this.user.email = this.email.value;
      this.user.phone = this.phone.value;
      this.user.birthDate = new Date(this.birthDate.value).toJSON();
      this.user.address = this.address.value;
      this.userSvc.registerUser(this.registerForm.value).subscribe({
        next: (val: any) => {
          alert('Registered')
        }
      })
    }
  }

  cancel(): void {
    this.registerForm.reset();
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