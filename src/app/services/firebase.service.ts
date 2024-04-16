import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, firstValueFrom, Observable, first } from 'rxjs';
import { User } from 'src/assets/User';
import { Trip } from '../trips-list';
import { Review } from '../review';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  trips: Observable<any[]>;
  constructor(private db: AngularFireDatabase) {
    this.trips = this.getTripList();
  }

  getTrips() {
    return this.trips;
  }

  getTripVal(id: number) {
    return this.tripData.find((data) => data.id == id);
  }

  createTrip(trip: Trip): void {
    this.db.list('trips').push(trip);
  }

  updateTrip2(id: number, data: Trip) {
    this.db
      .list('trips')
      .snapshotChanges()
      .pipe(first())
      .subscribe((items: any) => {
        for (let i of items) {
          if (i.payload.val().id == id) {
            this.db.list('trips').update(i.payload.key, {
              yoursRes: data.yoursRes,
              capacity: data.capacity,
            });
            console.log('UPDATE TRIP');
          }
        }
      });
  }

  updateTrip(id: number, data: Trip) {
    this.db
      .list('trips')
      .snapshotChanges()
      .pipe(first())
      .subscribe((items: any) => {
        for (let i of items) {
          if (i.payload.val().id == id) {
            this.db.list('trips').update(i.payload.key, data);
          }
        }
      });
  }

  updateTripFromBasket(id: number) {
    this.db
      .list('trips')
      .snapshotChanges()
      .pipe(first())
      .subscribe((items: any) => {
        for (let i of items) {
          if (i.payload.val().id == id) {
            this.db.list('trips').update(i.payload.key, {
              yoursRes: 0,
              capacity: i.payload.val().capacity - i.payload.val().yoursRes,
            });
          }
        }
      });
  }

  deleteTrip(key: string) {
    this.db.list('trips').remove(key);
  }

  minv: number;
  maxv: number;
  nextID: number;

  getTripList() {
    this.setMinMax();
    this.setDataObserver();
    return this.db
      .list('trips')
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

  getTripList2() {
    this.setMinMax();
    this.setDataObserver();
    return this.db.list('trips').valueChanges();
  }

  deleteAll() {
    this.db.list('trips').remove();
  }

  setMinMax() {
    this.db
      .list('trips')
      .valueChanges()
      .subscribe((data) => {
        let firstEl: boolean = true;
        this.minv = 0;
        this.maxv = 0;
        this.nextID = 0;
        for (let d of data) {
          let d1: any = d;
          if (firstEl || d1.id > this.nextID) this.nextID = d1.id;
          if (firstEl || d1.value < this.minv) this.minv = d1.value;
          if (firstEl || d1.value > this.maxv) this.maxv = d1.value;
          firstEl = false;
        }
      });
  }

  tripData: Array<any>;

  setDataObserver() {
    this.db
      .list('trips')
      .valueChanges()
      .subscribe((data) => {
        this.tripData = [];
        for (let d of data) {
          let d1: any = d;
          this.tripData.push(d1);
        }
      });
  }

  getMax() {
    return this.maxv;
  }

  getMin() {
    return this.minv;
  }

  getNextId() {
    return this.nextID + 1;
  }

  addUser(user: User) {
    this.db
      .object('/users/' + user.id)
      .set({ email: user.email, role: user.role });
  }

  async getUserRoles(UserID: string) {
    return firstValueFrom(
      this.db.object('/users/' + UserID + '/role').valueChanges()
    );
  }

  getUserRoles$(UserID: string) {
    return this.db.object('/users/' + UserID + '/role').valueChanges();
  }

  getUsers() {
    return this.db.list('users').snapshotChanges();
  }

  changeUserRole(UserID: string, role: string, value: boolean) {
    let change = '{"' + role + '"' + ':' + String(value) + '}';
    this.db.object('/users/' + UserID + '/role').update(JSON.parse(change));
  }

  //reviews

  createReview(rev: Review) {
    this.db.list('reviews').push(rev);
  }

  getReviews() {
    return this.db.list('reviews').valueChanges();
  }
}
