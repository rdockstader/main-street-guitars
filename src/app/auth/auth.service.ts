import { UIService } from './../shared/ui.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';



@Injectable()
export class AuthService {
  private user: User;

  constructor(private router: Router,
              private uiService: UIService,
              private store: Store<fromRoot.State>) {}

  registerUser(authData: AuthData) {
    if (authData.email === 'admin@msg.com') {
      this.user = {
        email: authData.email,
        id: Math.round(Math.random() * 1000).toString(),
        userType: 'admin'
      };
    } else {
      this.user = {
        email: authData.email,
        id: Math.round(Math.random() * 1000).toString(),
        userType: 'general'
      };
    }
    this.authSuccessful();
    this.store.dispatch(new UI.StopLoading());
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    // TODO: replace with actual login
    this.registerUser(authData);

  }

  logout() {
    this.user = null;
    this.store.dispatch(new Auth.SetUnauthenticated());
    this.store.dispatch(new Auth.SetNotAdmin());
    this.router.navigate(['/login']);
  }

  getUser(): User {
    return {...this.user};
  }

  private authSuccessful() {
    this.uiService.showSnackbar('Login Successful');
    this.store.dispatch(new Auth.SetAuthenticated());
    if (this.user.userType === 'admin') {
      this.store.dispatch(new Auth.SetIsAdmin());
    } else {
      this.store.dispatch(new Auth.SetNotAdmin());
    }
    this.router.navigate(['/']);
  }
}
