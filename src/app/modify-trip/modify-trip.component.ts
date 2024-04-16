import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket.service';
import { FirebaseService } from '../services/firebase.service';
import { Trip } from '../trips-list';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modify-trip',
  templateUrl: './modify-trip.component.html',
  styleUrls: ['./modify-trip.component.css'],
})
export class ModifyTripComponent implements OnInit {
  trip: any;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private FireService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const TripIdFromRoute = Number(routeParams.get('id'));
    this.trip = this.FireService.getTripVal(TripIdFromRoute);
    this.FireService.setMinMax();
  }

  save() {
    this.FireService.updateTrip(this.trip.id, this.trip);
  }

  onSubmit() {
    this.submitted = true;
    this.save();
    this.router.navigate(['../add']);
  }
}
