import { Model } from './models/model.model';
import { Make } from './makes/make.model';
import {
  MetadataActions,
  SET_MAKES,
  SET_MODELS
} from './metadata.actions';

export interface State {
  makes: Make[];
  models: Model[];
}

const initialState: State = {
  makes: [
    new Make(1, 'Gibson', new Date('11/14/2019')),
    new Make(2, 'Epiphone', new Date('11/14/2019')),
    new Make(3, 'Squire', new Date('11/14/2019')),
    new Make(4, 'Fender', new Date('11/14/2019')),
    new Make(5, 'Martin', new Date('11/14/2019')),
    new Make(6, 'Taylor', new Date('11/14/2019')),
  ],
  models: [
    new Model(1, 'Les Paul', new Date('11/14/2019')),
    new Model(2, 'SG', new Date('11/14/2019')),
    new Model(3, 'Stratocaster', new Date('11/14/2019')),
    new Model(4, 'Telecaster', new Date('11/14/2019')),
    new Model(5, 'GS Mini', new Date())
  ]
};

export function metadataReducer(state = initialState, action: MetadataActions) {
  switch (action.type) {
    case SET_MAKES:
      return {
        ...state,
        makes: action.payload
      };
    case SET_MODELS:
      return {
        ...state,
        models: action.payload
      };
    default: {
      return state;
    }
  }
}

export const getMakes = (state: State) => state.makes;
export const getModels = (state: State) => state.models;
