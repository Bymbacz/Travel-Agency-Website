import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HistoryService } from '../services/history.service';

@Injectable({
  providedIn: 'root',
})
export class HistoryResolver implements Resolve<any> {
  constructor(private hs: HistoryService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.hs.getHisList();
  }
}
