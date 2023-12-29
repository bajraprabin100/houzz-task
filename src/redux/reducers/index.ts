import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { AnyType } from '../../interfaces';
// -----===[REDUCERS]===-----
import appReducer from './app.reducer';
import authReducer from './auth.reducer';

export * from './types';

const createRootReducer = (history: History<AnyType>) =>
  combineReducers({
    app: appReducer,
    auth: authReducer,
    router: connectRouter(history)
  });

export default createRootReducer;
