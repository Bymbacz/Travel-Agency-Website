import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { NgImageSliderModule } from 'ng-image-slider';

import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { MainComponent } from './main/main.component';
import { NavComponent } from './nav/nav.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { BasketComponent } from './basket/basket.component';
import { HistoryComponent } from './history/history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SingleTripComponent } from './single-trip/single-trip.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ModifyTripComponent } from './modify-trip/modify-trip.component';
import { FilterPipePipe } from './filter-pipe.pipe';
import { FilterTripsComponent } from './trips/filter-trips/filter-trips.component';

@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    MainComponent,
    NavComponent,
    AddTripComponent,
    BasketComponent,
    HistoryComponent,
    PageNotFoundComponent,
    SingleTripComponent,
    SignupComponent,
    SigninComponent,
    AdminDashboardComponent,
    ClientDashboardComponent,
    ModifyTripComponent,
    FilterPipePipe,
    FilterTripsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxStarRatingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MdbCarouselModule,
    NgImageSliderModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
