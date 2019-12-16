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
  makes: [],
  models: []
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
