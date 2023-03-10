import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription, switchMap } from 'rxjs';
import { DialogData } from 'src/app/shared/models/dialog-data';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

import { MatSnackBar } from '@angular/material/snack-bar';


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
    email: ['', [Validators.pattern(/^[^\s@]+@[^\s@%]+\.[^\s@]+$/), Validators.required]],
    phone: [''],
    birthDate: [new Date()],
    address: ['']
  });

  sub?: Subscription;
  user?: User;
  isAdmin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private userSvc: UserService,
    private dialogSvc: DialogService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.profileForm.disable();
  }

  getCurrentUser(): void {
    this.sub = this.auth.user$.pipe(
      switchMap(user => {
        if (user) {
          return of(user);
        } else {
          this.isAdmin = true;
          return this.auth.admin$;
        }
      })
    ).subscribe(user => {
      if (user) {
        this.user = user;
        this.showProfile(this.user);
      }
    });
  }

  showProfile(user: User): void {
    this.profileForm.patchValue(user);

    if (user.birthDate) {
      const date = this.user?.birthDate.slice(0, 10);
      this.birthDate.setValue(date);
    }
  }

  editProfile(): void {
    this.profileForm.enable();
    this.username.disable();
  }

  confirm(): void {
    const data: DialogData = {
      title: 'Confirm',
      content: 'Would you like to save your changes?',
      confirm: 'Confirm',
      cancel: 'Cancel'
    }
    this.dialogSvc.confirm(data).subscribe(confirmed => {
      if (confirmed) {
        this.saveChanges();
      }
    });
  }

  saveChanges(): void {
    if (this.user) {
      this.user.firstName = this.firstName.value;
      this.user.lastName = this.lastName.value;
      this.user.email = this.email.value;
      this.user.phone = this.phone.value;
      this.user.birthDate = new Date(this.birthDate.value).toJSON();
      this.user.address = this.address.value;
      this.userSvc.update(this.user).subscribe(user => {
        if (user) {
          const key = (this.isAdmin) ? 'CURRENT_ADMIN' : 'CURRENT_USER';
          localStorage.setItem(key, JSON.stringify(user));
          this.profileForm.disable();
          this.snackBar.open('Changes saved.', '', {
            duration: 1000, verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
      })
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
    this.snackBar.open('You are logged out.', '', { duration: 1000 });
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
