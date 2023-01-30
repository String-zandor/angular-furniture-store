import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, switchMap, of } from 'rxjs';
import { AuthService } from 'src/app/modules/user/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.auth.isLoggedAsAdmin$.pipe(
      switchMap(isLoggedAsAdmin => {
        if (isLoggedAsAdmin) { 
          return of(true);
        } else {
          return this.auth.isLoggedIn$.pipe(
            map(isLoggedAsUser => {
              return (isLoggedAsUser) ? this.router.parseUrl('home') : this.router.parseUrl('/profile/login/admin')
            })
          )
        }
      })
    );
  }
  
}
