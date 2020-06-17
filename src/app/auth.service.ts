import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri = "localhost:4000/api";
  token;

  constructor(private http: HttpClient,private router: Router) { }

  login(email: string, password: string) {
    this.http.post(this.uri + '/login', {email: email, password: password})
    .subscribe((resp: any) => {
     
      localStorage.setItem('auth_token', resp.token);
      
    });
  }

  signup(name: string, email: string, password: string, isCook: boolean) {
    this.http.post(this.uri + '/signup', {name: name, email: email, password: password, isCook: isCook});
  }

  logout() {
    localStorage.removeItem('token');
  }
 
  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }
}
