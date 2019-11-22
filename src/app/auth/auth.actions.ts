import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';
export const SET_IS_ADMIN = '[Auth] Set Admin';
export const SET_NOT_ADMIN = '[Auth] Set Not Admin';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export class SetIsAdmin implements Action {
  readonly type = SET_IS_ADMIN;
}

export class SetNotAdmin implements Action {
  readonly type = SET_NOT_ADMIN;
}


export type AuthActions = SetAuthenticated | SetUnauthenticated | SetIsAdmin | SetNotAdmin;
