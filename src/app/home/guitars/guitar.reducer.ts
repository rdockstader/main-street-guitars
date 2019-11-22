import { GuitarFilter } from './guitarFilter.model';
import { Guitar } from './guitar.model';
import {
  GuitarActions,
  SET_GUITARS,
  SET_FILTERED_GUITARS
} from './guitar.actions';


const dummyData: Guitar[] = [
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
    id: '4',
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

export interface State {
  guitars: Guitar[];
  filteredGuitars: Guitar[];
}

const initialState: State = {
  guitars: dummyData,
  filteredGuitars: dummyData
};

export function guitarReducer(state = initialState, action: GuitarActions) {
  switch (action.type) {
    case SET_GUITARS:
      return {
        ...state,
        guitars: action.payload
      };
    case SET_FILTERED_GUITARS:
      return {
        ...state,
        filteredGuitars: action.payload
      };
    default: {
      return state;
    }
  }
}

export const getGuitars = (state: State) => state.guitars;
export const getFilteredGuitars = (state: State) => state.filteredGuitars;
