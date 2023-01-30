import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../user/models/user';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  serverUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.serverUrl}/users`);
  }
}
