import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';

import { Guitar } from './guitar.model';

@Injectable()
export class GuitarService {
  guitars: Guitar[] = [];
  public guitarsChanged = new Subject<void>();

  constructor(private snackBar: MatSnackBar) {}

  getGuitars() {
    return [...this.guitars];
  }

  getGuitar(id: string): Guitar {
    const guitar = this.guitars.find(g => g.id === id);
    if (guitar) {
      return guitar;
    }
    return null;
  }

  addGuitar(guitar: Guitar) {
    guitar.id = Math.round(Math.random() * 1000).toString();
    this.guitars.push(guitar);
    this.guitarsChanged.next();
    this.snackBar.open('Guitar created',  null, {
      duration: 3000
    });
  }

  updateguitar(guitar: Guitar) {
    const index = this.guitars.findIndex(g => g.id = guitar.id);
    if (!index || index < 0) {
      this.snackBar.open('Guitar ID not found',  null, {
        duration: 3000
      });
    } else {
      this.guitars[index] = guitar;
      this.guitarsChanged.next();
      this.snackBar.open('Guitar Updated',  null, {
        duration: 3000
      });
    }
  }

  removeGuitar(id: string) {
   const index = this.guitars.findIndex(g => g.id === id);
   if (index >= 0) {
     this.guitars.splice(index, 1);
     this.guitarsChanged.next();
     this.snackBar.open('Guitar removed',  null, {
      duration: 3000
    });
   } else {
    this.snackBar.open('Guitar not found',  null, {
      duration: 3000
    });
   }
  }
}
