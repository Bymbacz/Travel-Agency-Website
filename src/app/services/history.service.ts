import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';
import { Trip } from '../trips-list';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private db: AngularFireDatabase, private auth: AuthService) {}

  day: string;
  month: string;

  createTrip(trip: any): void {
    let Date1: Date = new Date();
    if (Date1.getMonth() + 1 < 10) {
      this.month = '0' + (Date1.getMonth() + 1).toString();
    } else {
      this.month = (Date1.getMonth() + 1).toString();
    }
    if (Date1.getDate() < 10) {
      this.day = '0' + Date1.getDate().toString();
    } else {
      this.day = Date1.getDate().toString();
    }
    let his = {
      id: trip.id,
      buyDate:
        Date1.getFullYear().toString() + '-' + this.month + '-' + this.day,
      price: trip.value,
      start: trip.start,
      end: trip.end,
      country: trip.country,
      numOfTickets: trip.numOfTickets,
    };
    this.db.list('history/' + this.auth.userData.uid).push(his);
  }

  getHisList() {
    return this.db.list('history/' + this.auth.userData.uid).valueChanges();
  }
}
