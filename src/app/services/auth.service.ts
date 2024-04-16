import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { User } from 'src/assets/User';
import { Role } from 'src/assets/Role';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any = null;
  userRoles: Role = {
    guest: true,
    admin: false,
    manager: false,
    client: false,
    banned: false,
  };
  CurrentPersistence: any;
  sum: any;
  elements: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private fbService: FirebaseService,
    private db: AngularFireDatabase
  ) {
    afAuth.authState.subscribe(async (user: any) => {
      if (user) {
        this.userData = user;
        const role = await this.fbService.getUserRoles(user.uid);
        this.userRoles = role as Role;
      } else {
        this.userData = null;
        this.userRoles = {
          guest: true,
          admin: false,
          manager: false,
          client: false,
          banned: false,
        };
      }
    });
    this.db
      .object('persistence')
      .valueChanges()
      .subscribe((e) => {
        this.CurrentPersistence = e;
      });
  }

  async SignInUser(email: string, password: string) {
    return this.afAuth
      .setPersistence(this.CurrentPersistence)
      .then(async (_) => {
        const result = await this.afAuth.signInWithEmailAndPassword(
          email,
          password
        );
        localStorage.setItem('user', JSON.stringify(result));
        this.router.navigate(['clientDashboard']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  async SignOut() {
    return this.afAuth.signOut().then((result) => {
      localStorage.removeItem('user');
      this.router.navigate(['main']);
    });
  }

  async SignUpUser(email: string, password: string, role: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        let user = new User(result.user);
        if (role == 'admin') {
          user.role.admin = true;
          user.role.client = false;
        }
        if (role == 'manager') {
          user.role.manager = true;
          user.role.client = false;
        }
        this.fbService.addUser(user);
        this.router.navigate(['clientDashboard']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  getAuthenticated(): Observable<any> {
    return this.afAuth.authState;
  }

  changePersistence(Persistence: string) {
    this.db.object('persistence').set(Persistence);
  }
}
