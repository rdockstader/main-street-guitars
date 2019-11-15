import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

import { Make } from './make.model';

@Injectable({
  providedIn: 'root'
})
export class MakesService {
  public makesChanged = new Subject<void>();
  private makes: Make[] = [
    new Make(1, 'Gibson', new Date('11/14/2019')),
    new Make(2, 'Epiphone', new Date('11/14/2019')),
    new Make(3, 'Squire', new Date('11/14/2019')),
    new Make(4, 'Fender', new Date('11/14/2019')),
    new Make(5, 'Martin', new Date('11/14/2019')),
    new Make(6, 'Taylor', new Date('11/14/2019')),
  ];
  private nextMakeID = 7;
  constructor(private snackBar: MatSnackBar) {
  }

  getMakes() {
    return [...this.makes];
  }

  AddMake(value: string) {
    const newMakeID = this.nextMakeID++;

    this.makes.push(new Make(newMakeID, value, new Date()));
    this.makesChanged.next();
    this.snackBar.open('Make Added!', null, {
      duration: 3000
    });
  }

  RemoveMake(MakeID: number) {
    const index = this.makes.findIndex(make => make.makeID === MakeID);
    if (index >= 0) {
      this.makes.splice(index, 1);
      this.makesChanged.next();
      this.snackBar.open('Make Removed!',  null, {
        duration: 3000
      });
    } else {
      this.snackBar.open('Invalid MakeID: ' + MakeID, null, {
        duration: 3000
      });
    }
  }
}
