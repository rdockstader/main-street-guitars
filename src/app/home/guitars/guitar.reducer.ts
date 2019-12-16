import { Guitar } from './guitar.model';
import {
  GuitarActions,
  SET_GUITARS,
  SET_FILTERED_GUITARS
} from './guitar.actions';

export interface State {
  guitars: Guitar[];
  filteredGuitars: Guitar[];
}

const initialState: State = {
  guitars: [],
  filteredGuitars: []
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
