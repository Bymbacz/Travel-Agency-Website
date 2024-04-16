import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripsComponent } from './trips/trips.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainComponent } from './main/main.component';
import { BasketComponent } from './basket/basket.component';
import { HistoryComponent } from './history/history.component';
import { SingleTripComponent } from './single-trip/single-trip.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManagerGuard } from './guard/manager.guard';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ModifyTripComponent } from './modify-trip/modify-trip.component';
import { TripListResolver } from './resolver/trip-list.resolver';
import { HistoryResolver } from './resolver/history.resolver';
import { BasketResolver } from './resolver/basket.resolver';
import { ReviewsResolver } from './resolver/reviews.resolver';

const routes: Routes = [
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthGuard],
    resolve: { history: HistoryResolver },
  },
  {
    path: 'basket',
    component: BasketComponent,
    canActivate: [AuthGuard],
  },
  { path: 'main', component: MainComponent },
  {
    path: 'trips/:id',
    component: SingleTripComponent,
    canActivate: [AuthGuard],
    resolve: {
      review: ReviewsResolver,
    },
  },
  {
    path: 'trips',
    component: TripsComponent,
    resolve: {
      trips: TripListResolver,
    },
  },
  {
    path: 'add/:id',
    component: ModifyTripComponent,
    canActivate: [AuthGuard, ManagerGuard],
  },
  {
    path: 'add',
    component: AddTripComponent,
    canActivate: [AuthGuard, ManagerGuard],
    /*resolve: {
      trips: TripListResolver,
    }*/
  },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  {
    path: 'adminDashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard, AuthGuard],
  },
  {
    path: 'clientDashboard',
    component: ClientDashboardComponent,
    canActivate: [AuthGuard],
    resolve: { basket: BasketResolver },
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
