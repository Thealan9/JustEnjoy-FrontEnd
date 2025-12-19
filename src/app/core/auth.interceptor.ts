import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from,Observable,throwError  } from 'rxjs';
import { catchError,switchMap,take } from 'rxjs/operators';
import { Auth } from './auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: Auth,
    private router: Router
) {}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if (req.url.includes('/login') || req.url.includes('/register')) {
      return next.handle(req);
    }

    return this.auth.getToken$().pipe(
      take(1),
      switchMap(token => {
        if (token) {
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(authReq);
        }

        return next.handle(req);
      })
    );
  }
}
