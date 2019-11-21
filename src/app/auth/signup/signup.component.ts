import { UIService } from './../../shared/ui.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  isLoadingSubscription: Subscription;

  MaxDate: Date;

  constructor(private authService: AuthService,
              private uiService: UIService) { }

  ngOnInit() {
    this.MaxDate = new Date();
    this.isLoadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
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
