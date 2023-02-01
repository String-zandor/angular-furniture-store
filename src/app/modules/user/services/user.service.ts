import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

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

  //New method
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.serverUrl}/users`, user);
  }

  
  
}
