import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css', '../../assets/fontello/css/fontello.css'],
})
export class NavComponent {
  constructor(private basket: BasketService, public authService: AuthService) {}
  getSum() {
    return this.basket.sum;
  }
  getNumOfElements() {
    return this.basket.elements;
  }
}
