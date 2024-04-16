import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../services/basket.service';
import { FirebaseService } from '../services/firebase.service';
import { Trip } from '../trips-list';
@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css'],
})
export class AddTripComponent implements OnInit {
  trip: Trip = new Trip();
  submitted = true;

  constructor(
    private FireService: FirebaseService,
    private basket: BasketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.FireService.setMinMax();
    //this.Trips = this.route.snapshot.data['trips'];
    this.Trips = this.FireService.getTripList();
  }

  newTrip(): void {
    this.submitted = false;
    this.trip = new Trip();
  }

  save() {
    this.trip.capacity = this.trip.max_capacity;
    this.trip.id = this.getID();
    this.trip.yoursRes = 0;
    this.FireService.createTrip(this.trip);
    this.trip = new Trip();
  }

  getID() {
    return this.FireService.getNextId();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  //z listy wycieczek

  Trips: any;

  getMin() {
    return this.FireService.getMin();
  }
  getMax() {
    return this.FireService.getMax();
  }

  deleteTrip(key: string) {
    this.FireService.deleteTrip(key);
  }
}
