import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { User, UserCred } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  serverUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.serverUrl}/users`);
  }

  getUser(key: number): Observable<User> {
    return this.http.get<User>(`${this.serverUrl}/users/${key}`);
  }

  add(user: User): Observable<User> {
    return this.http.post<User>(`${this.serverUrl}/users`, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.serverUrl}/users/${user.id}`, user);
  }

  registerUser(user: User, userCred: UserCred): Observable<User | null> {
    return this.http.post<UserCred>(`${this.serverUrl}/auth`, userCred).pipe(
      switchMap(cred => {
        if (cred.id) {
          user.key = cred.id;
          return this.http.post<User>(`${this.serverUrl}/users`, user)
        } else {
          return of(null);
        }
      })
    );
  }

  
  
}
