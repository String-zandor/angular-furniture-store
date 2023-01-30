import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/modules/user/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.auth.isLoggedIn$.pipe(
      switchMap(isLoggedAsUser => {
        if (isLoggedAsUser) {
          return of(true);
        } else {
          return this.auth.isLoggedAsAdmin$.pipe(
            map(isLoggedAsAdmin => {
              return (isLoggedAsAdmin) ? this.router.parseUrl('/admin') : this.router.parseUrl('/profile/login')
            })
          )
        }
      })
    );
  }

}
