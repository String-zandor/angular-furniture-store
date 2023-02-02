import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { OneTimePassword } from '../models/one-time-password';
import { User, UserCred } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl: string = 'http://localhost:3000';

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  isLoggedIn$: Observable<boolean> = of(false);

  private adminSubject = new BehaviorSubject<User | null>(null);
  admin$ = this.adminSubject.asObservable();
  isLoggedAsAdmin$: Observable<boolean> = of(false);

  constructor(private userSvc: UserService, private http: HttpClient) {
    this.isLoggedIn$ = this.user$.pipe(
      map(user => !!user)
    );

    this.isLoggedAsAdmin$ = this.admin$.pipe(
      map(admin => !!admin)
    );
    
    this.getCurrentUser();
    this.getCurrentAdmin();

  }

  getCurrentUser(): void {
    const userStr: string | null = localStorage.getItem('CURRENT_USER');
    if (userStr) {
      this.userSubject.next(JSON.parse(userStr));
    }
  }

  getCurrentAdmin(): void {
    const adminStr: string | null = localStorage.getItem('CURRENT_ADMIN');
    if (adminStr) {
      this.adminSubject.next(JSON.parse(adminStr));
    }
  }

  login(data: {username: string, password: string}): Observable<User | null> {
    return this.authenticate(data).pipe(
      map(cred => (cred?.role === 'USER') ? cred : null),
      switchMap(cred => {
        if (cred?.id) {
          return this.userSvc.getUser(cred.id).pipe(
            tap(user => {
              this.userSubject.next(user);
              localStorage.setItem('CURRENT_USER', JSON.stringify(user));
            })
          );
        } else { return of(null); }
      })
    );
  }

  authenticate(data: {username: string, password: string}): Observable<UserCred | null> {
    return this.http.get<UserCred[]>(`${this.serverUrl}/auth`).pipe(
      map(creds => creds
        .find(user => (user.username === data.username) && (user.password === data.password) && user.active)
        ),
      map(cred => (cred) ? cred : null),
    );
  }
  
  loginAsAdmin(data: {username: string, password: string}): Observable<User | null> {
    return this.authenticate(data).pipe(
      map(cred => (cred?.role === 'ADMIN') ? cred : null),
      switchMap(cred => {
        if (cred?.id) {
          return this.userSvc.getUser(cred.id).pipe(
            tap(user => {
              this.adminSubject.next(user);
              localStorage.setItem('CURRENT_ADMIN', JSON.stringify(user));
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }
  
  verifyEmail(email: string):Observable<User|undefined>{
    return this.userSvc.getUsers().pipe(
      map(users=>users.find(u => u.email === email))
    )
  }

  verifyOtp(user:User):Observable<OneTimePassword|undefined>{
    return this.http.get<OneTimePassword>(`${this.serverUrl}/otp/${user.id}`)
  }

  logout(): void {
    localStorage.removeItem('CURRENT_USER');
    localStorage.removeItem('CURRENT_ADMIN');
    this.userSubject.next(null);
    this.adminSubject.next(null);
  }


  //updates status to active or inactive
  isActive(postId: number, data: any): Observable<any> {
    const url = `${this.serverUrl}/auth/${postId}`;
    return this.http.patch(url, data);
  }

  //get All user including admin
  getAllUsers(): Observable<UserCred[]> {
    return this.http.get<UserCred[]>(`${this.serverUrl}/auth`);
  }

  updateUserCred(user: UserCred): Observable<UserCred> {
    return this.http.put<UserCred>(`${this.serverUrl}/auth/${user.id}`, user);
  }

  getUserCred(key: number): Observable<UserCred> {
    return this.http.get<UserCred>(`${this.serverUrl}/auth/${key}`);
  }
}
