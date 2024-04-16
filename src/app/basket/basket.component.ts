import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../services/basket.service';
import { FirebaseService } from '../services/firebase.service';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  constructor(
    private basket: BasketService,
    private fireService: FirebaseService,
    private hs: HistoryService,
    private route: ActivatedRoute
  ) {}

  Trips: any;

  ngOnInit(): void {
    this.Trips = this.basket.getBasket2();
    console.log(this.Trips);
  }

  buy(trip: any) {
    this.basket.buy(trip.key);
    trip.data.capacity -= 1;
    trip.data.yoursRes -= 1;
    this.fireService.updateTripFromBasket(trip.data.id);
    this.hs.createTrip(trip.data);
  }
}
