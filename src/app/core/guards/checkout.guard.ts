import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CheckoutComponent } from 'src/app/modules/cart/pages/checkout/checkout.component';
import { CheckoutService } from 'src/app/modules/cart/services/checkout.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate, CanDeactivate<CheckoutComponent>{

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

  canDeactivate(component: CheckoutComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(component.shippingForm.dirty){
      return component.canExit();
    }
    return true
  }
  
}
