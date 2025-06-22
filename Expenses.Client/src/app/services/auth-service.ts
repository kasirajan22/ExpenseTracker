import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/iuser';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IAuthResponse } from '../models/iauth-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5298/';
  private currentUsenSubject = new BehaviorSubject<string | null>(null);
  currentUser$ = this.currentUsenSubject.asObservable();
  constructor(private http: HttpClient, private router: Router) { 
    const token = localStorage.getItem("token");
    if(token){
      this.currentUsenSubject.next('user');
    }
  }

  login(credentials: IUser): Observable<IAuthResponse>{
    return this.http.post<IAuthResponse>(this.apiUrl + 'api/Auth/Login', credentials)
    .pipe(
      tap((response) => {
      localStorage.setItem("token", response.token);
      this.currentUsenSubject.next('user');
    }));
  }
  register(credentials: IUser): Observable<IAuthResponse>{
    return this.http.post<IAuthResponse>(this.apiUrl + 'api/Auth/Register', credentials).
    pipe(
      tap((response) => {
      localStorage.setItem("token", response.token);
      this.currentUsenSubject.next('user');
    }));
  }
  logout(): void {
    localStorage.removeItem("token");
    this.currentUsenSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !!token; // Returns true if token exists, false otherwise
  }
  getToken(): string | null {
    return localStorage.getItem("token");
  }
}
