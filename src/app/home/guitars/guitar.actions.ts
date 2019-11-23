import { Action } from '@ngrx/store';
import { Guitar } from './guitar.model';

export const SET_GUITARS = '[Auth] Set Guitars';
export const SET_FILTERED_GUITARS = '[Auth] Set Filtered Guitars';

export class SetGuitars implements Action {
  readonly type = SET_GUITARS;

  constructor(public payload: Guitar[]) {}
}

export class SetFilteredGuitars implements Action {
  readonly type = SET_FILTERED_GUITARS;

  constructor(public payload: Guitar[]) {}
}

export type GuitarActions = SetGuitars | SetFilteredGuitars;
