import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Auth } from './auth';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
  const allowedRoles: string[] = route.data['roles'];

  // Convertimos la promesa de getUser en un flujo que el Guard entienda
  return from(this.auth.getUser()).pipe(
    map(user => {
      if (!user) {
        return this.router.createUrlTree(['/login']);
      }

      if (!allowedRoles.includes(user.role)) {
        const redirectPath = user.role === 'admin' ? '/admin' : '/home';
        return this.router.createUrlTree([redirectPath]);
      }

      return true;
    })
  );
}
}
