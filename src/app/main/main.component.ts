import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private db: AngularFireDatabase) {}
  imgLink: any;
  ngOnInit(): void {
    this.db
      .object('map')
      .valueChanges()
      .subscribe((e) => {
        this.imgLink = e;
      });
  }
}
