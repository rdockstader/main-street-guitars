import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Guitar } from './guitar.model';
import { UIService } from './../../shared/ui.service';
import { GuitarFilter } from './guitarFilter.model';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import * as GuitarActions from './guitar.actions';

@Injectable()
export class GuitarService {

  constructor(private uiService: UIService,
              private store: Store<fromRoot.State>) {}

  // TODO: add fetch guitar(s)

  addGuitar(guitar: Guitar) {
    this.store.select(fromRoot.getGuitars).subscribe(guitars => {
      guitar.id = Math.round(Math.random() * 1000).toString();
      guitar.addDate = new Date();
      guitars.push(guitar);
      this.uiService.showSnackbar('Guitar created');
      this.store.dispatch(new GuitarActions.SetGuitars(guitars));
    });
  }

  updateguitar(guitar: Guitar) {
    this.store.select(fromRoot.getGuitars).subscribe(guitars => {
      const index = guitars.findIndex(g => g.id === guitar.id);
      if (index < 0) {
        this.uiService.showSnackbar('Guitar ID not found');
      } else {
        guitars[index] = guitar;
        this.uiService.showSnackbar('Guitar Updated');
        this.store.dispatch(new GuitarActions.SetGuitars(guitars));
      }
    });
  }

  removeGuitar(id: string) {
    this.store.select(fromRoot.getGuitars).subscribe(guitars => {
      const index = guitars.findIndex(g => g.id === id);
      console.log('index: ' + index + ' | id: ' + id);
      if (index >= 0) {
        guitars.splice(index, 1);
        this.uiService.showSnackbar('Guitar Removed');
        this.store.dispatch(new GuitarActions.SetGuitars(guitars));
      } else {
      this.uiService.showSnackbar('Guitar not found');
      }
    });
  }

  filterGuitars(filter: GuitarFilter) {
      this.store.select(fromRoot.getGuitars).subscribe(guitars => {
        if (filter) {
          let filteredGuitars = [...guitars];
          if (filter.makes && filter.makes.length > 0) {
            filteredGuitars = filteredGuitars.filter(g => filter.makes.indexOf(g.make) >= 0);
          }
          if (filter.models && filter.models.length > 0) {
            filteredGuitars = filteredGuitars.filter(g => filter.models.indexOf(g.model) >= 0);
          }
          if (filter.lowestPrice && filter.lowestPrice >= 0) {
            filteredGuitars = filteredGuitars.filter(g => g.price >= filter.lowestPrice);
          }
          if (filter.highestPrice && filter.highestPrice >= 0) {
            filteredGuitars = filteredGuitars.filter(g => g.price <= filter.highestPrice);
          }
          if (filteredGuitars.length > 0) {
            this.store.dispatch(new GuitarActions.SetFilteredGuitars(filteredGuitars));
          } else {
            this.store.dispatch(new GuitarActions.SetFilteredGuitars(guitars));
            this.uiService.showSnackbar('No results in filter');
          }
        } else {
          this.store.dispatch(new GuitarActions.SetFilteredGuitars(guitars));
          this.uiService.showSnackbar('Filter Reset');
        }
      });
    }
}
