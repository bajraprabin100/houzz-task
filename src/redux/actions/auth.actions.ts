import { OktaAuth } from '@okta/okta-auth-js';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { LoginResponse } from '../../api';
import { client } from '../../graphql';
import { AnyType } from '../../interfaces';
import { CALLBACK_PATH } from '../../utils';
import { AppRootState } from '../reducers';
import { OKTA_ISSUER_PATH } from '../../api/index';

export enum AuthActionsEnum {
  AUTH_ERROR = '[AUTH] Auth Error',
  AUTH_STATE_CHANGE = '[AUTH] Auth State Change',
  CONFIG_ERROR = '[AUTH/CONFIG] Config Error',
  CONFIG_LOADED = '[AUTH/CONFIG] Config Loaded',
  LOGIN = '[AUTH] Login',
  LOGOUT = '[AUTH] Logout',
  USER_DETAILS = '[AUTH] User Details'
}

export const cacheUserData = (payload: AnyType) => async (dispatch: Dispatch) => {
  dispatch({ type: AuthActionsEnum.USER_DETAILS, payload });
};

export const loadConfig = () => async (dispatch: Dispatch<AnyType>, getState: () => AppRootState) => {
  try {
    const oktaConfig = {
      redirectUri: `${window.location.protocol}//${window.location.host}${CALLBACK_PATH}`,
      scopes: ['openid', 'profile', 'email'],
      responseType: ['code', 'token', 'id_token'],
      pkce: true,
      tokenManager: {
        autoRenew: true,
        expireEarlySeconds: 120,
        storage: 'sessionStorage'
      }
    };

    const oktaAuth = new OktaAuth(oktaConfig);

    dispatch<ThunkAction<void, AnyType, unknown, AnyType>>(listenOnAuthState(oktaAuth));
    dispatch({
      type: AuthActionsEnum.CONFIG_LOADED,
      payload: {
        oktaConfig,
        oktaAuth
      }
    });
  } catch (error) {
    dispatch({ type: AuthActionsEnum.CONFIG_ERROR, payload: error });
  }
};

const listenOnAuthState = (oktaAuth: OktaAuth): ThunkAction<void, AnyType, unknown, AnyType> => async (
  dispatch: Dispatch<AnyType>
) => {
  oktaAuth.authStateManager?.subscribe(async (authState: AnyType) => {
    let user = null;

    if (authState.isAuthenticated) {
      user = await oktaAuth.getUser();
    }

    const payload = {
      user
    };
    dispatch({ type: AuthActionsEnum.AUTH_STATE_CHANGE, payload });
  });
};

export const login = (loginResponse: LoginResponse) => async (dispatch: Dispatch, getState: () => AppRootState) => {
  const oktaConfig = {
    redirectUri: `${window.location.protocol}//${window.location.host}${CALLBACK_PATH}`,
    scopes: ['openid', 'profile', 'email'],
    responseType: ['code', 'token', 'id_token'],
    pkce: true,
    tokenManager: {
      autoRenew: true,
      expireEarlySeconds: 120,
      storage: 'sessionStorage'
    }
  };

  const oktaAuth = new OktaAuth(oktaConfig);
  let authErrorMessage = 'Login unsuccessful. The username or password provided is incorrect.';

  try {
    const resultStatus = loginResponse?.status?.toLowerCase();

    if (resultStatus === 'locked_out') {
      authErrorMessage =
        'Login unsuccessful. Please use the "Forgot Your Password?" link below to reset your password.';
    }

    if (resultStatus !== 'success') {
      dispatch(authError(authErrorMessage));
      return;
    }

    const payload = {
      sessionToken: loginResponse?.sessionToken
    };

    dispatch({ type: AuthActionsEnum.LOGIN, payload });

    await oktaAuth.token?.getWithRedirect({
      responseType: getState().auth.oktaConfig?.responseType,
      sessionToken: payload.sessionToken ?? ''
    });
  } catch (error) {
    dispatch(authError(authErrorMessage));
  }
};

export const logout = () => async (dispatch: Dispatch, getState: () => AppRootState) => {
  const oktaAuth = getState().auth.oktaAuth;

  try {
    sessionStorage.clear();
    client.resetStore().catch((e) => {
      oktaAuth?.signOut({ postLogoutRedirectUri: window.location.origin + '/login' });
      dispatch({ type: AuthActionsEnum.LOGOUT });
    });
    oktaAuth?.signOut({ postLogoutRedirectUri: window.location.origin + '/login' });
    dispatch({ type: AuthActionsEnum.LOGOUT });
  } catch (error) {
    dispatch(authError(error.message));
  }
};

export const authError = (errorMessage?: string) => {
  const defaultErrorMessage = 'There was an error with authentication.';
  return {
    type: AuthActionsEnum.AUTH_ERROR,
    payload: errorMessage ?? defaultErrorMessage
  };
};

export const renewSession = () => async (dispatch: Dispatch<AnyType>, getState: () => AppRootState) => {
  try {
    await getState()?.auth?.oktaAuth?.session?.refresh();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
    dispatch<ThunkAction<void, AnyType, unknown, AnyType>>(logout());
  }
};
