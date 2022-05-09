import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebRequestService } from '../web-request.service';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  user = new Subject<User>();

  private _registerUrl = 'http://localhost:3000/user';
  private _userUrl = 'http://localhost:3000/user';
  private _loginUrl = 'http://localhost:3000/login';

  constructor(
    private http: HttpClient,
    private webReqService: WebRequestService
  ) {}

  signup(
    username: string,
    email: string,
    password: string,
    name: string,
    phone: string,
    dateOfBirth: string,
    gender: string
  ) {
    return this.http.post('http://localhost:3000/user', {
      username: username,
      password: password,
      email: email,
      name: name,
      phone: phone,
      dateOfBirth: dateOfBirth,
      gender: gender,
    });
  }

  login(username: string, password: string) {
    return this.http.post<any>(this._loginUrl, {
      username: username,
      password: password,
    });
  }

  // Get all users
  async getUsers() {
    const users = await this.http.get(this._userUrl);
    return users;
  }

  //Handle Authentication

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  private handleAuthentication(
    username: string,
    userId: string,
    token: string
  ) {
    const user = new User(username, userId, token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  //Error handling
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'Wrong email':
        errorMessage = 'The email in incorrect.';
        break;
      case 'Email is already taken':
        errorMessage = 'Email is already taken.';
        break;
      case 'Wrong password':
        errorMessage = 'This password is incorrect.';
        break;
      case 'Username is already taken':
        errorMessage = 'Username is already taken.';
        break;
      case 'Wrong username':
        errorMessage = 'Username is incorrect.';
        break;
    }
    return throwError(errorMessage);
  }
}
