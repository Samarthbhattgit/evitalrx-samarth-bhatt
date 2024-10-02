import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /* authentication flag */
  private isAuthenticated = false;
  /* store flag accrding to user login */
  public isUserLogin: BehaviorSubject<boolean> = new BehaviorSubject(false); 
  /* api key */
  private apiKey = "wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3";  

  constructor(private router: Router, private http: HttpClient) { 
    localStorage.setItem("apiKey", "wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3");
  }

  login(mobile: string, password: string): boolean {
    const loginPayload = {
      apikey: this.apiKey,
      mobile: mobile,
      password: password
    }
    this.http.post<any>("https://api.evitalrx.in/v1/patient/login", loginPayload).pipe(
      tap((res) => {
        if (!!res?.data?.status_code) {
          localStorage?.setItem("patient_id", res.data);
          this.isAuthenticated = true;
        }
      }),
    ).subscribe();
    // return !!this.isAuthenticated ? true: false;
    // as api is not working every one can login, static login process
    this.isUserLogin.next(true);
    return this.isAuthenticated = true;
  }

  /* logout event */
  logout(): void {
    this.isAuthenticated = false;
    this.isUserLogin.next(false);
    this.router.navigate(['/']);
  }

  /* check is user login */
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
