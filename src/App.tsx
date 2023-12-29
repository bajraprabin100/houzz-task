import { OktaAuth } from '@okta/okta-auth-js';
import { History } from 'history';
import React, { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRouting } from './AppRouting';
import { AppRootState, AuthState, cacheUserData } from './redux';
import 'bootstrap/dist/css/bootstrap.min.css';

interface AppProps extends PropsWithChildren<unknown> {
  history: History;
}

const App = ({ history }: AppProps) => {
  const dispatch = useDispatch();
  const auth: AuthState = useSelector((state: AppRootState) => state.auth);

  // if (!auth?.oktaConfig || !auth?.oktaAuth) return <LoadingIndicatorRow />;
  // if (auth?.configError) return <>There was an issue getting config data.</>;

  return (
    <>
      <AppRouting history={history} />
    </>
  );
};

export default App;
