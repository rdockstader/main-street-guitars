import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Make } from './make.model';
import { UIService } from 'src/app/shared/ui.service';

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
  constructor(private uiService: UIService) {
  }

  getMakes() {
    return [...this.makes];
  }

  AddMake(value: string) {
    const newMakeID = this.nextMakeID++;

    this.makes.push(new Make(newMakeID, value, new Date()));
    this.makesChanged.next();
    this.uiService.showSnackbar('Make Added!');
  }

  RemoveMake(MakeID: number) {
    const index = this.makes.findIndex(make => make.makeID === MakeID);
    if (index >= 0) {
      this.makes.splice(index, 1);
      this.makesChanged.next();
      this.uiService.showSnackbar('Make Removed!');
    } else {
      this.uiService.showSnackbar('Invalid MakeID: ' + MakeID);
    }
  }
}
