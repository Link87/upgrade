import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users$: BehaviorSubject<User | null>;

  constructor(private http: HttpClient) {
    this.users$ = new BehaviorSubject<User | null>(this.decodeToken(localStorage.getItem('jwtToken')));
  }

  public login(username: string, password: string): Observable<User> {
    return this.http.post<{ token: string }>(`http://${window.location.hostname}:3000/auth/login`, {
      username,
      password
    })
    .pipe(
      tap(response => {
        localStorage.setItem('jwtToken', response.token);
      }),
      map(response => this.decodeToken(response.token)),
      tap(user => {
        console.log(user);
        this.users$.next(user);
        return user;
      })
    );
  }

  public create(username: string, password: string): Observable<User> {
    return this.http.post<{ token: string }>(`http://${window.location.hostname}:3000/auth/create`, {
      username,
      password
    })
    .pipe(
      tap(response => {
        localStorage.setItem('jwtToken', response.token);
      }),
      map(response => this.decodeToken(response.token)),
      tap(user => {
        console.log(user);
        this.users$.next(user);
        return user;
      })
    );
  }

  public logout() {
    localStorage.removeItem('jwtToken');
    this.users$.next(null);
    console.log('logout');
  }

  public get token(): string {
    return (this.users$.value === null) ? undefined : this.users$.value.token;
  }

  public get user(): User {
    return (this.users$ == null) ? undefined : this.users$.value;
  }

  public isAuthenticated(): boolean {
    return this.users$.value && !!this.users$.value.token;
  }

  public getObserver(): Observable<User> {
    return this.users$.asObservable();
  }

  private decodeToken(token: string | null): User | null {
    if (token == null) {
      return null;
    }
    const decoded: any = jwt_decode(token);
    decoded.token = token;
    return decoded as User;
  }

}
