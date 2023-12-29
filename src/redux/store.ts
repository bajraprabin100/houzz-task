import { Action, Reducer, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import { AuthActionsEnum } from './actions';
import rootReducer from './reducers';
import { AnyType } from '../interfaces';

const initialState = {};

const resetEnhancer = (rootReducer: Reducer) => (state = initialState, action: Action) => {
  if (action.type === AuthActionsEnum.LOGOUT) return rootReducer(undefined, { type: null });
  return rootReducer(state, action);
};

export const history = createBrowserHistory();

const middleware = [routerMiddleware(history), thunk];

const composeEnhancers = composeWithDevTools({
  name: 'STANDARD_PORTAL_STORE'
});

export const makeStore = (rootHistory: AnyType) => {
  return createStore(
    resetEnhancer(rootReducer(rootHistory)),
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );
};

export const store = makeStore(history);

export default store;
