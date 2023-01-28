import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CheckoutService } from 'src/app/modules/cart/services/checkout.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {

  constructor(private check: CheckoutService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.check.forCheckout$.pipe(
      map(forCheckout => {
        return (forCheckout) ? true : this.router.parseUrl('/home');
      })
    );
  }
  
}
