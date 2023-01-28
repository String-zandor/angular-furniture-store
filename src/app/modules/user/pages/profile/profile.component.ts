import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileForm: FormGroup = this.fb.group({
    id: [0],
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.pattern(/^[^\s@]+@[^\s@%]+\.[^\s@]+$/)],
    phone: [''],
    birthDate: [new Date()],
    address: ['']
  });

  sub?: Subscription;
  user?: User;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.sub = this.auth.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.showProfile(this.user);
      }
    });
    this.profileForm.disable();
  }

  showProfile(user: User): void {
    this.profileForm.patchValue(user);
    const date = this.user?.birthDate.slice(0,10);
    this.birthDate.setValue(date);
  }

  editProfile(): void {
    this.profileForm.enable();
    this.username.disable();
  }

  saveChanges(): void {
    if (this.user) {
      this.user.firstName = this.firstName.value;
      this.user.lastName = this.lastName.value;
      this.user.email = this.email.value;
      this.user.phone = this.phone.value;
      this.user.birthDate = new Date(this.birthDate.value).toJSON();
      this.user.address = this.address.value;
      this.userSvc.update(this.user).subscribe(() => this.profileForm.disable());
    }
  }

  cancel(): void {
    if (this.user) {
      this.showProfile(this.user);
      this.profileForm.disable();
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['login'], { relativeTo: this.route });
  }

  get username(): FormControl {
    return this.profileForm.get('username') as FormControl;
  }

  get firstName(): FormControl {
    return this.profileForm.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.profileForm.get('lastName') as FormControl;
  }

  get email(): FormControl {
    return this.profileForm.get('email') as FormControl;
  }

  get phone(): FormControl {
    return this.profileForm.get('phone') as FormControl;
  }

  get birthDate(): FormControl {
    return this.profileForm.get('birthDate') as FormControl;
  }

  get address(): FormControl {
    return this.profileForm.get('address') as FormControl;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
