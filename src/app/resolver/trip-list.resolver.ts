import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { Trip } from '../trips-list';

@Injectable({
  providedIn: 'root',
})
export class TripListResolver implements Resolve<any> {
  constructor(private tripList: FirebaseService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.tripList.getTripList();
  }
}
