import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Guitar } from './guitar.model';
import { UIService } from './../../shared/ui.service';
import { GuitarFilter } from './guitarFilter.model';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';

import * as fromRoot from '../../app.reducer';
import * as GuitarActions from './guitar.actions';

@Injectable()
export class GuitarService {
  private guitarCollectionName = 'guitars';

  constructor(private uiService: UIService,
              private store: Store<fromRoot.State>,
              private db: AngularFirestore) {}

  fetchGuitars() {
    this.db
    .collection(this.guitarCollectionName)
    .snapshotChanges()
    .pipe(map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          make: doc.payload.doc.data()['make'],
          model: doc.payload.doc.data()['model'],
          subModel: doc.payload.doc.data()['subModel'],
          imageUrl: doc.payload.doc.data()['imageUrl'],
          color: doc.payload.doc.data()['color'],
          description: doc.payload.doc.data()['description'],
          price: doc.payload.doc.data()['price'],
          addDate: doc.payload.doc.data()['addDate'],
        };
      });
    })).subscribe((guitars: Guitar[]) => {
      console.log(guitars);
      this.store.dispatch(new GuitarActions.SetGuitars(guitars));
      this.store.dispatch(new GuitarActions.SetFilteredGuitars(guitars));
    });
  }

  addGuitar(guitar: Guitar) {
    guitar.addDate = new Date();
    delete guitar.id;
    console.log(guitar);
    this.db.collection(this.guitarCollectionName).add(guitar).then(() => {
      this.uiService.showSnackbar('Guitar created');
      this.fetchGuitars();
    });
  }

  updateguitar(guitar: Guitar) {
    this.db.collection(this.guitarCollectionName).doc(guitar.id).update(guitar).then(() => {
      this.uiService.showSnackbar('Guitar Updated');
      this.fetchGuitars();
    }).catch(err => {
      console.log(err);
      this.uiService.showSnackbar('Guitar ID not found');
    });
  }

  removeGuitar(id: string) {
    this.db.collection(this.guitarCollectionName).doc(id).delete().then(() => {
      this.uiService.showSnackbar('Guitar Removed');
      this.fetchGuitars();
    }).catch(err => {
      console.log(err);
      this.uiService.showSnackbar('Guitar not found');
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
