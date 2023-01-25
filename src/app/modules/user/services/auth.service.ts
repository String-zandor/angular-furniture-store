import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private subject = new BehaviorSubject<User | null>(null);
  user$ = this.subject.asObservable();
  isLoggedIn$: Observable<boolean> = of(false);

  constructor(private userService: UserService) {
    this.isLoggedIn$ = this.user$.pipe(
      map(user => !!user)
    );

    const userStr: string | null = localStorage.getItem('CURRENT_USER');
    if (userStr) {
      this.subject.next(JSON.parse(userStr));
    }
  }

  login(username: string, password: string): Observable<User | null> {
    return this.userService.getUsers().pipe(
      map(users => users.find(user => user.username === username && user.password === password))
    ).pipe(
      map(user => {
        if (user) {
          this.subject.next(user);
          localStorage.setItem('CURRENT_USER', JSON.stringify(user));
          return user;
        } else {
          return null;
        }
      })
    );
  }

  /**
   * TODO: implement admin function
   */
  loginAsAdmin(username: string, password: string): Observable<User | null> {
    // TODO: get admin user
    return of(null);
  }
  
  logout() {
    localStorage.removeItem('CURRENT_USER');
    this.subject.next(null);
  }

  ngOnDestroy(): void {
    this.logout();
  }
}
