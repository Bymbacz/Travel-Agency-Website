import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css'],
})
export class ClientDashboardComponent {
  constructor(public authService: AuthService, public basket: BasketService) {
    basket.getBasket2();
  }
}
