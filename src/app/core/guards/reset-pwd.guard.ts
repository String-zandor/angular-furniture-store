import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/modules/user/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPwdGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.auth.reset$.pipe(
      map(fromOTP => (fromOTP) ? true : this.router.parseUrl('/'))
    );
  }
  
}
