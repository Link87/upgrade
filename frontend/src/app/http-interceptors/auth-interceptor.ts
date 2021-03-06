import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.token;

    if (token == null) {
      return next.handle(req);
    }

    const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

    return next.handle(authReq);
  }

}
