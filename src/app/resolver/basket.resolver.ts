import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { BasketService } from '../services/basket.service';

@Injectable({
  providedIn: 'root',
})
export class BasketResolver implements Resolve<any> {
  constructor(private basket: BasketService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.basket.getBasket2();
  }
}
