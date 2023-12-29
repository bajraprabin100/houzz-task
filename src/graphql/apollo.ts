import { ApolloClient, createHttpLink, InMemoryCache, InMemoryCacheConfig } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AnyType } from '../interfaces';
import { getAuthorizationHeader } from '../utils';

export const GRAPHQL_DEFAULT_CACHE = 'no-cache';

const cacheOptions: InMemoryCacheConfig = {
  resultCaching: false
};

const httpLink = createHttpLink({
  uri: String((window as AnyType).REACT_APP_GRAPHQL_URL)
});

const authLink = setContext((_, { headers: defaultHeaders }) => {
  const updatedHeaders = {
    headers: {
      ...defaultHeaders
    }
  };

  const authorization = getAuthorizationHeader();
  if (authorization) {
    updatedHeaders.headers.authorization = authorization;
  }

  // return the headers to the context so httpLink can read them
  return updatedHeaders;
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(cacheOptions)
});
