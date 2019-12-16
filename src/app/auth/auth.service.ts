import { UIService } from './../shared/ui.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';
import { AngularFirestore } from 'angularfire2/firestore';



@Injectable()
export class AuthService {
  private user: User;
  private userCollectionName = 'users';

  constructor(private router: Router,
              private uiService: UIService,
              private store: Store<fromRoot.State>,
              private afAuth: AngularFireAuth,
              private db: AngularFirestore) {}

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    // authentication
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      // authorization
      this.db.collection(this.userCollectionName).add({email: authData.email, userType: 'user'}).then(result => {
        this.authSuccessful();
        this.store.dispatch(new UI.StopLoading());
      }).catch(error => {
        console.log(error);
        this.store.dispatch(new UI.StopLoading());
      });
    })
    .catch(err => {
      console.log(err);
      this.store.dispatch(new UI.StopLoading());
    });
  }

  login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      // authorization
      this.db.collection(this.userCollectionName, ref => ref.where('email', '==', authData.email).limit(1))
          .get().subscribe(r => {
            this.user = {email: authData.email, userType: r.docs[0].data().userType, id: r.docs[0].id};
            this.authSuccessful();
          });
    })
    .catch(err => {
      this.uiService.showSnackbar(err.message);
      this.store.dispatch(new UI.StopLoading());
    });
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
