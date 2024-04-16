import { Component, OnInit } from '@angular/core';
import { Trip } from '../trips-list';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { BasketService } from '../services/basket.service';
import { AuthService } from '../services/auth.service';
import { Review } from '../review';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css'],
})
export class SingleTripComponent implements OnInit {
  trip: any;
  images: Array<object>;
  reviews: any;
  TripIdFromRoute: number;
  Date1: Date;
  currDate: string;
  month: string;
  day: string;
  constructor(
    private route: ActivatedRoute,
    private fireService: FirebaseService,
    private basket: BasketService,
    public authService: AuthService
  ) {}
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.TripIdFromRoute = Number(routeParams.get('id'));
    this.trip = this.fireService.getTripVal(this.TripIdFromRoute);

    this.Date1 = new Date();
    if (this.Date1.getMonth() + 1 < 10) {
      this.month = '0' + (this.Date1.getMonth() + 1).toString();
    } else {
      this.month = (this.Date1.getMonth() + 1).toString();
    }
    if (this.Date1.getDate() < 10) {
      this.day = '0' + this.Date1.getDate().toString();
    } else {
      this.day = this.Date1.getDate().toString();
    }
    this.currDate =
      this.Date1.getFullYear().toString() + '-' + this.month + '-' + this.day;

    //this.reviews = this.route.snapshot.data['review'];
    this.reviews = this.fireService.getReviews();

    this.images = [
      {
        image: this.trip.link as string,
        thumbImage: this.trip.link as string,
      },
      {
        image: this.trip.image1 as string,
        thumbImage: this.trip.image1 as string,
      },
      {
        image: this.trip.image2 as string,
        thumbImage: this.trip.image2 as string,
      },
    ];
  }

  plusClick(trip: Trip) {
    trip.yoursRes += 1;
    this.basket.incBasket(trip);
    this.fireService.updateTrip2(trip.id, trip);
  }
  minusClick(trip: Trip) {
    if (trip.yoursRes > 0) {
      trip.yoursRes -= 1;
      this.basket.decBasket(trip);
      this.fireService.updateTrip2(trip.id, trip);
    }
  }

  // opinie

  rev: Review = new Review();
  submitted = false;

  newReview(): void {
    this.submitted = false;
    this.rev = new Review();
  }

  save() {
    this.rev.id = this.TripIdFromRoute;
    this.rev.nick = this.authService.userData.email;
    this.fireService.createReview(this.rev);
    this.rev = new Review();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  goodID() {
    return this.TripIdFromRoute;
  }

  Form = new FormGroup({
    date: new FormControl(''),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(500),
    ]),
  });

  get content() {
    return this.Form.get('content');
  }
}
