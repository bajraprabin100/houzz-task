import { isEqual } from 'lodash';
import { AnyAction } from 'redux';

import { AuthActionsEnum } from '../actions/auth.actions';
import { AuthState } from './types';

const initialState: AuthState = {};

export default (state = initialState, action: AnyAction) => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case AuthActionsEnum.AUTH_STATE_CHANGE:
      if (isEqual(state.session?.user, action.payload.user)) return state;
      return {
        ...state,
        session: {
          ...state.session,
          ...action.payload
        },
        isAdmin: action.payload?.user?.UserRole?.toLowerCase() === 'admin'
      };
    case AuthActionsEnum.AUTH_ERROR:
      return {
        ...state,
        authError: action.payload
      };
    case AuthActionsEnum.CONFIG_ERROR:
      return {
        ...state,
        oktaConfig: null,
        configError: action.payload
      };
    case AuthActionsEnum.CONFIG_LOADED:
      return {
        ...state,
        ...action.payload
      };
    case AuthActionsEnum.USER_DETAILS:
      return {
        ...state,
        session: {
          ...state.session,
          userDetails: {
            ...action.payload.userDetails,
            name: state.session?.user?.name,
            email: state.session?.user?.email,
            given_name: handleName(state.session?.user?.given_name, state.session?.user?.name, true),
            family_name: handleName(state.session?.user?.family_name, state.session?.user?.name, false),
            Login: state.session?.user?.Login
          },
          orgDetails: {
            ...action.payload.orgDetails
          },
          userInfo: {
            ...action.payload.userInfo
          }
        }
      };
    default:
      return state;
  }
};

const handleName = (name: string | undefined, fullName: string | undefined, isGiven: boolean) => {
  const nameArray = fullName && fullName.split(' ');
  const firstName = nameArray && nameArray[0];
  const lastName = nameArray && nameArray.slice(1).join(' ');
  const fallbackName = isGiven ? firstName : lastName;

  return name ?? fallbackName;
};
