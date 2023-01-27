import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    middleName: [''],
    lastName: ['', Validators.required],
    email: ['', Validators.pattern(/^[^\s@]+@[^\s@%]+\.[^\s@]+$/)],
    phone: ['', Validators.required],
    birthDate: [''],
    address: [''],
    interests: this.fb.array([''])
  });

  sub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService) {
      
  }

  ngOnInit(): void {
    this.sub = this.auth.user$.subscribe(user => {
      if (user) {
        this.showProfile(user);
      }
    });
    this.profileForm.disable();
  }

  showProfile(user: User) {
    this.profileForm.patchValue(user);
    this.interests.clear();
    for (const interest of user.interests) {
      this.interests.push(this.fb.control(interest));
    }
  }

  editProfile() {
    this.profileForm.enable();
  }

  /**
   * TODO: implement this method
   */
  saveChanges() {
    this.profileForm.disable();
  }

  get interests(): FormArray {
    return this.profileForm.get('interests') as FormArray;
  }

  deleteInterest(i: number): void {
    this.interests.removeAt(i);
  }

  addInterest(): void {
    this.interests.push(this.fb.control(''));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
