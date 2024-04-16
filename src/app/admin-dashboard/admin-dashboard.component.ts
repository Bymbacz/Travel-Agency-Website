import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { User } from 'src/assets/User';
import { Role } from 'src/assets/Role';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(public auth: AuthService, private fb: FirebaseService) {}

  selectedPersistence = this.auth.CurrentPersistence;

  selectedRoleToAdd: any;
  selectedRoleToDismiss: any;

  users: User[] = [];

  ngOnInit(): void {
    this.fb.getUsers().subscribe((users) => {
      this.users = [];
      for (let user of users) {
        let user2 = new User(user.payload.val());
        console.log(user.payload.val());
        console.log(user2);
        user2.id = user.payload.key || 'undefined';
        this.users.push(user2);
      }
    });
  }

  chosePersistence() {
    this.auth.changePersistence(this.selectedPersistence);
  }

  setRole(UserId: string, role: string, value: boolean) {
    this.fb.changeUserRole(UserId, role, value);
  }
}
