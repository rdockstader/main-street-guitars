import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-featured-card',
  templateUrl: './home-featured-card.component.html',
  styleUrls: ['./home-featured-card.component.css']
})
export class HomeFeaturedCardComponent implements OnInit {
  @Input() source: string;

  constructor() { }

  ngOnInit() {
  }

}
