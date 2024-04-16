import { Injectable, OnInit } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Trip } from '../trips-list';
import { map, firstValueFrom, Observable, first } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BasketService implements OnInit {
  constructor(private db: AngularFireDatabase, private auth: AuthService) {}

  sum: number;
  elements: number;

  ngOnInit(): void {
    this.getBasket2();
  }
  trips: Trip[] = [];

  addToBasket(trip: Trip) {
    if (this.trips.length > 0) this.trips.splice(0, 0, trip);
    else this.trips.push(trip);
    this.elements += 1;
    this.sum += trip.value;
  }

  deleteFromBasket(trip: Trip) {
    let index = this.trips.findIndex((e) => e.id == trip.id);
    this.trips.splice(index, 1);
    this.sum -= trip.value;
    this.elements -= 1;
  }

  getBasket(): Trip[] {
    return this.trips;
  }

  // ------------------- przenoszenie do Bazy ----------------
  getBasket2() {
    this.setSumEl();
    this.setDataObserver();
    return this.db
      .list('basket/' + this.auth.userData.uid)
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const key = a.payload.key;
            const data = a.payload.val();
            return { data, key };
          });
        })
      );
  }

  basketData: Array<any>;

  setDataObserver() {
    this.db
      .list('basket' + this.auth.userData.uid)
      .valueChanges()
      .subscribe((data) => {
        this.basketData = [];
        for (let d of data) {
          let d1: any = d;
          this.basketData.push(d1);
        }
      });
  }

  addToBasket2(d: any) {
    let data = {
      name: d.title,
      id: d.id,
      numOfTickets: 1,
      start: d.start,
      end: d.end,
      country: d.country,
      value: d.value,
    };
    this.db.list('basket/' + this.auth.userData.uid).push(data);
    this.elements += 1;
    this.sum += d.value;
    console.log(this.basketData);
  }

  deleteFromBasket2(id: number) {
    this.db
      .list('basket/' + this.auth.userData.uid)
      .snapshotChanges()
      .pipe(first())
      .subscribe((items: any) => {
        for (let i of items) {
          if (i.payload.val().id == id) {
            this.elements -= 1;
            this.sum -= i.payload.val().value;
            this.db
              .list('basket/' + this.auth.userData.uid)
              .remove(i.payload.key);
            console.log('REMOVE');

            break;
          }
        }
      });
  }

  buy(key: string) {
    this.db.list('basket/' + this.auth.userData.uid).remove(key);
  }

  setSumEl() {
    this.db
      .list('basket/' + this.auth.userData.uid)
      .valueChanges()
      .subscribe((data) => {
        this.sum = 0;
        this.elements = 0;
        for (let d of data) {
          let d1: any = d;
          this.sum += d1.value;
          this.elements += d1.numOfTickets;
        }
      });
  }

  incBasket(data: any) {
    this.db
      .list('basket/' + this.auth.userData.uid)
      .snapshotChanges()
      .pipe(first())
      .subscribe((items: any) => {
        console.log('TRY TO UPDATE BASKET');
        let flag = false;
        for (let i of items) {
          console.log('TRY for ' + i.payload.val().id + ' ' + data.id);
          if (i.payload.val().id == data.id) {
            console.log('UPDATE: ' + data.id);
            this.elements += 1;
            this.sum += i.payload.val().value;
            this.db
              .list('basket/' + this.auth.userData.uid)
              .update(i.payload.key, {
                numOfTickets: i.payload.val().numOfTickets + 1,
                value: i.payload.val().value + data.value,
              });

            flag = true;

            console.log(flag);

            break;
          }
        }
        if (!flag) {
          this.addToBasket2(data);
          console.log('INSERT: ' + data.id);
        }
      });
  }

  decBasket(data: any) {
    this.db
      .list('basket/' + this.auth.userData.uid)
      .snapshotChanges()
      .pipe(first())
      .subscribe((items: any) => {
        console.log('TRY TO UPDATE BASKET');
        for (let i of items) {
          console.log('TRY for ' + i.payload.val().id + ' ' + data.id);
          if (i.payload.val().id == data.id) {
            console.log('UPDATE: ' + data.id);
            this.elements -= 1;
            this.sum -= i.payload.val().value;
            if (i.payload.val().numOfTickets == 1) {
              this.db
                .list('basket/' + this.auth.userData.uid)
                .remove(i.payload.key);
            } else {
              this.db
                .list('basket/' + this.auth.userData.uid)
                .update(i.payload.key, {
                  numOfTickets: i.payload.val().numOfTickets - 1,
                  value: i.payload.val().value - data.value,
                });
            }
            break;
          }
        }
      });
  }
}
