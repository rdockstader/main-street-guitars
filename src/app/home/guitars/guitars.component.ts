import { Guitar } from './guitar.model';
import { GuitarService } from './guitar.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-guitars',
  templateUrl: './guitars.component.html',
  styleUrls: ['./guitars.component.css']
})
export class GuitarsComponent implements OnInit, OnDestroy {
  guitars: Guitar[] = [];
  guitarsChangedSub: Subscription;

  constructor(private guitarService: GuitarService) { }

  ngOnInit() {
    this.guitars = this.guitarService.getGuitars();
    this.guitarsChangedSub = this.guitarService.guitarsChanged.subscribe(() => {
      this.guitars = this.guitarService.getGuitars();
    });
  }

  ngOnDestroy() {
    if (this.guitarsChangedSub) {
      this.guitarsChangedSub.unsubscribe();
    }
  }

}
