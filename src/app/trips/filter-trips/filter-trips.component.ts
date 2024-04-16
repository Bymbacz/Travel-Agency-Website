import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/services/basket.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Filter } from 'src/assets/Filter';

@Component({
  selector: 'app-filter-trips',
  templateUrl: './filter-trips.component.html',
  styleUrls: ['./filter-trips.component.css'],
})
export class FilterTripsComponent implements OnInit {
  constructor(
    private FireService: FirebaseService,
    public route: ActivatedRoute
  ) {}
  filter: Filter;
  Trips: any;
  ngOnInit() {
    this.Trips = this.FireService.getTrips();
    this.filter = new Filter();

    this.filter.max = this.getMax();
    this.filter.min = this.getMin();
  }

  getMin() {
    return this.FireService.getMin();
  }
  getMax() {
    return this.FireService.getMax();
  }
}
