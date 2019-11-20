import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    if (authData.email === 'admin@msg.com') {
      this.user = {
        email: authData.email,
        userId: Math.round(Math.random() * 1000).toString(),
        userType: 'admin'
      };
    } else {
      this.user = {
        email: authData.email,
        userId: Math.round(Math.random() * 1000).toString(),
        userType: 'general'
      };
    }
    this.authSuccessful();
  }

  login(authData: AuthData) {
    // TODO: replace with actual login
    this.registerUser(authData);

  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser(): User {
    return {...this.user};
  }

  isAuth(): boolean {
    return this.user != null;
  }

  isAdmin(): boolean {
    return (this.user && this.user.userType === 'admin');
  }

  private authSuccessful() {
    this.authChange.next(true);
    this.router.navigate(['/']);
  }
}
