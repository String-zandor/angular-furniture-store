import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private subject = new BehaviorSubject<boolean>(false);
  forCheckout$: Observable<boolean> = this.subject.asObservable();

  checkout(confirmed: boolean): void {
    this.subject.next(confirmed);
  }
  
}
