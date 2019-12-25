import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // tslint:disable-next-line: variable-name
  private _token: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  public async login(username: string, password: string): Promise<string> {
    const response = await this.http.post<{ token: string }>(`http://${window.location.hostname}:3000/auth/login`, {
      username,
      password
    }).toPromise();

    const token = response.token;
    this._token.next(token);

    return token;
  }

  public async create(username: string, password: string): Promise<string> {
    const response = await this.http.post<{ token: string }>(`http://${window.location.hostname}:3000/auth/create`, {
      username,
      password
    }).toPromise();

    const token = response.token;
    this._token.next(token);

    return token;
  }

  public get token(): Observable<string> {
    return this._token;
  }

  public get userId(): Observable<string> {
    return this._token.pipe(map(token => {
      const decode: any =  jwt_decode(token);
      return decode.userId;
    }));
  }

}
