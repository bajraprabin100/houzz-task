import { AnyType } from '../interfaces';

export const oktaTokenStorageKey = 'okta-token-storage';

export const getAuthorizationHeader = () => {
  // get the authentication token from local storage if it exists
  const oktaToken = sessionStorage.getItem(oktaTokenStorageKey);
  const token = oktaToken && JSON.parse(oktaToken)?.accessToken?.accessToken;

  if (!token) return null;

  return `Bearer ${token}`;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const restRequestOptions = (_url: string, _method: string, _requestBody: AnyType) => {
  const authorization = getAuthorizationHeader();

  if (!authorization) return {};

  return {
    headers: { authorization }
  };
};
