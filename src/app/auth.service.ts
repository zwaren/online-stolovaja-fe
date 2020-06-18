import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri = "/api/auth";

  private tokenSubject: BehaviorSubject<string>;
  public token: Observable<string>;

  constructor(private http: HttpClient, private router: Router) {
    this.tokenSubject = new BehaviorSubject<string>(localStorage.getItem('auth_token'));
    this.token = this.tokenSubject.asObservable();
  }

  login(username: string, password: string) {
    this.http.post(this.uri + '/login/', { username: username, password: password })
      .subscribe((resp: any) => {
        localStorage.setItem('auth_token', resp.token);
        this.tokenSubject.next(resp.token);
      });
  }

  signup(username: string, email: string, password: string): boolean {
    let ret: boolean;
    this.http.post(this.uri + '/signup/', { username: username, email: email, password: password })
      .subscribe((resp: any) => {
        ret = true;
      },
        (err: HttpErrorResponse) => {
          console.log(err);
          ret = false;
        });
    return ret;
  }

  logout() {
    const headers = { 'Authorization': `Token ${this.tokenSubjectValue}` }
    this.http.get(this.uri + '/logout/', { headers }).subscribe(
      resp => { },
      err => { console.log(err); }
    );
    localStorage.removeItem('auth_token');
    this.tokenSubject.next(null);
  }

  public get tokenSubjectValue(): string {
    return this.tokenSubject.value;
  }

  public get isLogedIn(): boolean {
    return (this.tokenSubjectValue !== null);
  }
}
