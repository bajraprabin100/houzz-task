import { MockedProvider } from '@apollo/client/testing';
import { render, RenderOptions } from '@testing-library/react';
import { DocumentNode } from 'graphql';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { AnyType } from '../../../interfaces';

interface AllProvidersProps {
  children: React.ReactElement;
}

const mockStore = configureStore([]);

export interface GqlMock {
  request: { query: DocumentNode; variables: AnyType };
  result: { data: AnyType };
}

export function mockProviderRenderer(
  ui: React.ReactElement,
  initialState?: AnyType,
  gqlMocks?: Array<GqlMock>,
  options?: RenderOptions
) {
  const store = mockStore({ ...initialState });
  const AllProviders = ({ children }: AllProvidersProps) => {
    return (
      <Provider store={store}>
        <MockedProvider mocks={gqlMocks}>{children}</MockedProvider>
      </Provider>
    );
  };
  const renderResult = render(ui, { wrapper: AllProviders as React.ComponentType, ...options });
  return { store, ...renderResult };
}

export const nextTick = async () => act(async () => await new Promise((resolve) => setTimeout(resolve, 0)));
