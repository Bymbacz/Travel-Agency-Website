import { Component, OnInit, OnDestroy } from '@angular/core';
import { Trip } from '../trips-list';
import { FirebaseService } from '../services/firebase.service';
import { BasketService } from '../services/basket.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Filter } from 'src/assets/Filter';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements OnInit {
  constructor(
    private FireService: FirebaseService,
    private basket: BasketService,
    public authService: AuthService,
    public route: ActivatedRoute
  ) {}
  filter: Filter;
  Trips: any;
  Basket: any;

  ngOnInit() {
    this.Trips = this.route.snapshot.data['trips'];
    this.Basket = this.basket.getBasket2();
  }

  reserved() {
    return this.basket.elements;
  }

  getMin() {
    return this.FireService.getMin();
  }
  getMax() {
    return this.FireService.getMax();
  }

  plusClick(trip: any) {
    trip.data.yoursRes += 1;
    this.basket.incBasket(trip.data);
    this.FireService.updateTrip2(trip.data.id, trip.data);
  }
  minusClick(trip: any) {
    if (trip.data.yoursRes > 0) {
      trip.data.yoursRes -= 1;
      this.basket.decBasket(trip.data);
      this.FireService.updateTrip2(trip.data.id, trip.data);
    }
  }
}
