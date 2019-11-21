import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() toggleSidenav = new EventEmitter<void>();
  isAuth = false;
  authChangeSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authChangeSub = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  getIsAdmin(): boolean {
    return (this.isAuth) ? this.authService.isAdmin() : false;
  }

  onLogout() {
    this.onToggleSidenav();
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authChangeSub) {
      this.authChangeSub.unsubscribe();
    }
  }

}
