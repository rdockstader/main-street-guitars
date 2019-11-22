import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Guitar } from './guitar.model';
import { UIService } from './../../shared/ui.service';
import { GuitarFilter } from './guitarFilter.model';

@Injectable()
export class GuitarService {
  guitars: Guitar[] = [
    {
      id: '1',
      make: 'Gibson',
      model: 'Les Paul',
      subModel: 'traditional',
      imageUrl: 'https://static.gibson.com/product-images/USA/USAANM97/Satin%20Tobacco%20Burst/front-banner-1600_900.png',
      color: 'Tabacco Burst',
      description: 'The Les Paul Tribute captures the vibe, feel and tonality of a traditional Les Paul ' +
                   'and is available in four classic finishes. A rounded maple neck profile and ultra-modern ' +
                   ' weight relief make the Gibson Les Paul Studio Tribute a pleasure to play. A mahogany body,' +
                   ' maple top and pair of 490 R & T humbucking pickups with Alnico II magnets provide classic' +
                   'tone, power and sustain.',
      price: 1200.00,
      addDate: new Date()
    },
    {
      id: '2',
      make: 'Gibson',
      model: 'SG',
      subModel: 'Modern',
      imageUrl: 'https://static.gibson.com/product-images/USA/USAC9L891/Trans%20Black%20Fade/front-banner-1600_900.png',
      color: 'Translucent Charcoal',
      description: 'The new Gibson SG Modern incorporates many contemporary updates that players have ' +
                   ' embraced and it’s much more than a classic “solid guitar”; it’s a hybrid between an' +
                   ' SG and a Les Paul. Shaped and scarfed like a classic SG, the body is crafted with a' +
                   ' AA maple top and mahogany back, characteristic of a Les Paul. This combination is renowned' +
                   ' for its resonance and sustain. The genuine ebony, 24 fret compound radius fingerboard and' +
                   ' asymmetrical, slim taper neck allow fast and silky access to the highest frets. A pair of' +
                   ' calibrated BurstBucker Pro Alnico V humbuckers deliver fire power and the push-pull controls' +
                   ' allows you to switch between the Gibson humbucker and the single coil P90 sounds, both of which' +
                   ' have defined so many genres of music across multiple generations since we invented them. Upscale ' +
                   'appointments include genuine mother of pearl inlays, Grover locking Rotomatic tuners, and clear top hat knobs.',
      price: 1999.99,
      addDate: new Date()
    },
    {
      id: '3',
      make: 'Fender',
      model: 'Straocaster',
      subModel: 'Player',
      imageUrl: 'https://www.fmicassets.com/Damroot/ZoomJpg/10001/0144503515_gtr_frt_001_rr.jpg',
      color: 'Olympic White',
      description: 'The inspiring sound of a Stratocaster is one of the foundations of Fender.' +
                   ' Featuring this classic sound—bell-like high end, punchy mids and robust low' +
                   ' end, combined with crystal-clear articulation—the Player Stratocaster is' +
                   ' packed with authentic Fender feel and style. It’s ready to serve your musical' +
                   'vision, it’s versatile enough to handle any style of music and it’s the perfect' +
                   ' platform for creating your own sound.',
      price: 674.99,
      addDate: new Date()
    },
    {
      id: '3',
      make: 'Epiphone',
      model: 'Les Paul',
      subModel: ' Jared James Nichols “Old Glory” Les Paul Custom Outfit',
      imageUrl: 'http://images.epiphone.com/Products/Les-Paul/Jared-James-Nichols-Old-Glory-Les-Paul-Outfit/POP_jjnLESPAUL.jpg',
      color: 'Satin Black',
      description: 'The Ltd. Ed. Jared James Nichols “Old Glory” Les Paul Custom Outfit is ' +
                   'the premier signature model by the rising star from Les Paul’s hometown ' +
                   ' who Music Radar named their Top 5 Upcoming Guitar Players in the World.' +
                   ' Jared James Nichols’ “Old Glory” features a classic 1955-style Les Paul ' +
                   'Custom body with a single Seymour DuncanTM P-90 pickup, an Ebony fingerboard ' +
                   'with traditional block inlays, GroverTM Rotomatic tuners, and EpiLiteTM case ' +
                   'along with a signed Certificate of Authenticity.',
      price: 699.99,
      addDate: new Date()
    }
  ];
  filteredGuitars: Guitar[] = [];
  public guitarsChanged = new Subject<void>();

  constructor(private uiService: UIService) {}

  getGuitars() {
    if (this.filteredGuitars.length > 0 ) {
      return [...this.filteredGuitars];
    }
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
    guitar.addDate = new Date();
    this.guitars.push(guitar);
    this.guitarsChanged.next();
    this.uiService.showSnackbar('Guitar created');
  }

  updateguitar(guitar: Guitar) {
    const index = this.guitars.findIndex(g => g.id === guitar.id);
    if (index < 0) {
      this.uiService.showSnackbar('Guitar ID not found');
    } else {
      this.guitars[index] = guitar;
      this.guitarsChanged.next();
      this.uiService.showSnackbar('Guitar Updated');
    }
  }

  removeGuitar(id: string) {
   const index = this.guitars.findIndex(g => g.id === id);
   if (index >= 0) {
     this.guitars.splice(index, 1);
     this.guitarsChanged.next();
     this.uiService.showSnackbar('Guitar Removed');

   } else {
    this.uiService.showSnackbar('Guitar not found');
   }
  }

  filterGuitars(filter: GuitarFilter) {
    if (filter) {
      this.filteredGuitars = [...this.guitars];
      if (filter.makes && filter.makes.length > 0) {
        this.filteredGuitars = this.filteredGuitars.filter(g => filter.makes.indexOf(g.make) >= 0);
      }
      if (filter.models && filter.models.length > 0) {
        this.filteredGuitars = this.filteredGuitars.filter(g => filter.models.indexOf(g.model) >= 0);
      }
      if (filter.lowestPrice && filter.lowestPrice >= 0) {
        this.filteredGuitars = this.filteredGuitars.filter(g => g.price >= filter.lowestPrice);
      }
      if (filter.highestPrice && filter.highestPrice >= 0) {
        this.filteredGuitars = this.filteredGuitars.filter(g => g.price <= filter.highestPrice);
      }
      if (this.filteredGuitars.length > 0) {
        this.guitarsChanged.next();
      } else {
        this.uiService.showSnackbar('No guitars in Filter.');
      }
    } else {
      this.filteredGuitars = [];
      this.guitarsChanged.next();
    }
  }
}
