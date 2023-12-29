import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

import { ROUTE_PATHS } from '../../utils';
import { AnyType } from '../../interfaces';

export const navigateTo = (dispatch: Dispatch, path: string, state?: AnyType) => {
  dispatch(push(path, state));
};

export const navigateToTenancyLink = (link: AnyType) => (dispatch: Dispatch) =>
  navigateTo(dispatch, link.url ? link.url : (ROUTE_PATHS as AnyType)[link.routeName]);

export const navigateToLoginCallback = () => (dispatch: Dispatch) => navigateTo(dispatch, ROUTE_PATHS.loginCallback);

export const navigateToLogin = () => (dispatch: Dispatch) => navigateTo(dispatch, ROUTE_PATHS.login);

export const navigateToRegistration = () => (dispatch: Dispatch) => navigateTo(dispatch, ROUTE_PATHS.registration);

export const navigateToRegistrationSubmitted = () => (dispatch: Dispatch) => navigateTo(dispatch, ROUTE_PATHS.login);

export const navigateToHome = () => (dispatch: Dispatch) => navigateTo(dispatch, ROUTE_PATHS.home);
