import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  constructor(private hs: HistoryService, private route: ActivatedRoute) {}

  His: any;
  Date1: Date;
  currDate: string;
  month: string;
  day: string;
  past: boolean;
  future: boolean;
  now: boolean;

  ngOnInit() {
    this.His = this.route.snapshot.data['history'];
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
    this.past = true;
    this.future = true;
    this.now = true;
  }
}
