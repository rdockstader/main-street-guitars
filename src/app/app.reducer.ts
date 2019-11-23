import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromGuitar from './home/guitars/guitar.reducer';
import * as fromMetadata from './admin/guitars/metadata/metadata.reducer';


export interface State {
  ui: fromUi.State;
  auth: fromAuth.State;
  guitar: fromGuitar.State;
  metadata: fromMetadata.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer,
  guitar: fromGuitar.guitarReducer,
  metadata: fromMetadata.metadataReducer
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);
export const getIsAdmin = createSelector(getAuthState, fromAuth.getIsAdmin);

export const getGuitarState = createFeatureSelector<fromGuitar.State>('guitar');
export const getGuitars = createSelector(getGuitarState, fromGuitar.getGuitars);
export const getFilteredGuitars = createSelector(getGuitarState, fromGuitar.getFilteredGuitars);

export const getMetadataState = createFeatureSelector<fromMetadata.State>('metadata');
export const getMakes = createSelector(getMetadataState, fromMetadata.getMakes);
export const getModels = createSelector(getMetadataState, fromMetadata.getModels);
