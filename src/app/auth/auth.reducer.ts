import {
  AuthActions,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_IS_ADMIN,
  SET_NOT_ADMIN
} from './auth.actions';


export interface State {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const initialState: State = {
  isAuthenticated: false,
  isAdmin: false
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false
      };
    case SET_IS_ADMIN:
      return {
        ...state,
        isAdmin: true
      };
    case SET_NOT_ADMIN:
      return {
        ...state,
        isAdmin: false
      };
    default: {
      return state;
    }
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
export const getIsAdmin = (state: State) => state.isAdmin;
