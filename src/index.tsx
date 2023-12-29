import { ApolloProvider } from '@apollo/client';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RestfulProvider } from 'restful-react';
import { API_URL } from './api';
import App from './App';
import { client } from './graphql';
import store, { history } from './redux/store';
import * as serviceWorker from './serviceWorker';
import { restRequestOptions } from './utils';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <RestfulProvider base={API_URL} requestOptions={restRequestOptions}>
          <App history={history} />
        </RestfulProvider>
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
