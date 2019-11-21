import { Subscription } from 'rxjs';
import { UIService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  isLoadingSubscription: Subscription;

  constructor(private authService: AuthService,
              private uiService: UIService) { }

  ngOnInit() {
    this.isLoadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy() {
    if (this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }
  }

}
