import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from './../../auth/auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
   this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
   this.isAdmin$ = this.store.select(fromRoot.getIsAdmin);
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  onLogout() {
    this.onToggleSidenav();
    this.authService.logout();
  }
}
