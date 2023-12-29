import { getAuthorizationHeader, oktaTokenStorageKey, restRequestOptions } from '.';

const fullToken = {
  accessToken: {
    accessToken: 'access-token'
  }
};

describe('Requests', () => {
  beforeEach(() => sessionStorage.clear());
  afterEach(() => sessionStorage.clear());

  describe('getAuthorizationHeader', () => {
    test('returns null when no header exists', async () => {
      expect(getAuthorizationHeader()).toBeNull();
    });

    test('returns a Bearer token', async () => {
      sessionStorage.setItem(oktaTokenStorageKey, JSON.stringify(fullToken));

      expect(getAuthorizationHeader()).toEqual(`Bearer ${fullToken.accessToken.accessToken}`);
    });
  });

  describe('restRequestOptions', () => {
    test('returns null when no header exists', async () => {
      expect(restRequestOptions('', '', '')).toEqual({});
    });

    test('returns an authorization header', async () => {
      sessionStorage.setItem(oktaTokenStorageKey, JSON.stringify(fullToken));

      expect(restRequestOptions('', '', '')).toEqual({
        headers: { authorization: `Bearer ${fullToken.accessToken.accessToken}` }
      });
    });
  });
});
