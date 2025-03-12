import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_model/User.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  currentUser!: User | null;
  baseUrl = 'https://localhost:5001/api/account/';
  constructor(private http: HttpClient) {}

  getCurrentUser() {
    return this.currentUser;
  }

  register(user: any) {
    return this.http.post<User>(this.baseUrl + 'register', user).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }

        this.currentUser = user;

        return user;
      })
    );
  }

  login(user: any) {
    return this.http.post<User>(this.baseUrl + 'login', user).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }

        this.currentUser = user;

        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser = null;
  }
}
