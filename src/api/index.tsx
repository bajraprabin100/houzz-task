import { AnyType } from '../interfaces';

export * from './portal.generated';

export const API_APPLICATION_NAME = String((window as AnyType).REACT_APP_API_APPLICATION_NAME);
export const API_DEMO_APPLICATION_NAME = String((window as AnyType).REACT_APP_API_DEMO_APPLICATION_NAME);
export const API_URL = String((window as AnyType).REACT_APP_API_URL);
export const CONFIG_DOMAIN = String((window as AnyType).REACT_APP_CONFIG_DOMAIN);
export const GATEWAY_API_URL = String((window as AnyType).REACT_APP_GATEWAY_API_URL);
export const SERVICES_GATEWAY_URL = String((window as AnyType).REACT_APP_SERVICES_GATEWAY_URL);
export const SESSION_TIMEOUT_IN_MINUTES = String((window as AnyType).REACT_APP_SESSION_TIMEOUT_IN_MINUTES);
export const SESSION_WARNING_IN_MINUTES = String((window as AnyType).REACT_APP_SESSION_WARNING_IN_MINUTES);
export const OKTA_ISSUER_PATH = String((window as AnyType).REACT_APP_OKTA_ISSUER_PATH);
// -----===[STANDARD PORTAL]===-----
export const STANDARD_PORTAL_APPLICATION_NAME = String((window as AnyType).REACT_APP_STANDARD_PORTAL_APPLICATION_NAME);
export const GOOGLE_API_KEY = String((window as AnyType).REACT_APP_GOOGLE_MAP_API_KEY);
