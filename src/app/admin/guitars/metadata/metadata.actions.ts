import { Model } from './models/model.model';
import { Make } from './makes/make.model';
import { Action } from '@ngrx/store';

export const SET_MAKES = '[Metadata] Set Makes';
export const SET_MODELS = '[Metadata] Set Models';

export class SetMakes implements Action {
  readonly type = SET_MAKES;

  constructor(public payload: Make[]) {}
}

export class SetModels implements Action {
  readonly type = SET_MODELS;

  constructor(public payload: Model[]) {}
}

export type MetadataActions = SetMakes | SetModels;
