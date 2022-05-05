import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

// Wraps all the request methods
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost:3000"
  }

  // GET method
  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  // POST method
  post(uri: string, payload: object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  // PATCH method
  patch(uri: string, payload: object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  // DELETE method
  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  // DELETE method
  put(uri: string, payload: object) {
    return this.http.put(`${this.ROOT_URL}/${uri}`, payload);
  }


  login(username: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users/login`, {
      username,
      password
    }, {
        observe: 'response'
      });
  }

  signup(username: string, password: string, email: string, dateOfBirth: string, phone: string, gender: string) {
    return this.http.post(`${this.ROOT_URL}/users`, {
      username,
      password,
      email,
      phone,
      dateOfBirth,
      gender
    }, {
        observe: 'response'
      });
  }
}
