import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidenav = new EventEmitter<void>();
  isAuth = false;
  authChangeSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authChangeSub = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
    this.authService.login({email: 'admin@msg.com', password: 'bleh'});
  }

  ngOnDestroy() {
    if (this.authChangeSub) {
      this.authChangeSub.unsubscribe();
    }
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  getIsAdmin(): boolean {
    return (this.isAuth) ? this.authService.isAdmin() : false;
  }

  onLogout() {
    this.authService.logout();
  }

}
