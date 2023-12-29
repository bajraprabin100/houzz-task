import { SecureRoute, Security } from '@okta/okta-react';
import { History } from 'history';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteComponentProps, Router, Switch, useHistory } from 'react-router-dom';
import { FeatureGuard } from './components/multi-tenant/FeatureGuard';
import { AnyType, OktaConfig } from './interfaces';
import { AppRootState } from './redux';
import { ROUTE_PATHS } from './utils';
import * as views from './views';

const PUBLIC_ROUTES: AppRoute[] = [{ path: ROUTE_PATHS.landingPage, component: views.HomeView }];

const PRIVATE_ROUTES: AppRoute[] = [];

const ADMIN_ONLY_ROUTES: AppRoute[] = [];

const buildPublicRoutes = mapToRoutes(PUBLIC_ROUTES, Route);
const buildPrivateRoutes = mapToRoutes(PRIVATE_ROUTES, SecureRoute);
const buildAdminOnlyRoutes = mapToAdminRoutes(ADMIN_ONLY_ROUTES, SecureRoute);

interface AppRoutingProps {
  history: History;
  // config: OktaConfig;
  // oktaAuth: OktaAuth;
}

interface AppRoute {
  component: AnyType;
  path: string;
  featureKey?: string;
}

export const AppRouting = (props: AppRoutingProps) => {
  return (
    <Router history={props.history}>
      <Switch>
        {buildPublicRoutes}
        {buildAdminOnlyRoutes}
        {buildPrivateRoutes}
        <Route path='*'>
          <Redirect to={ROUTE_PATHS.home} />
        </Route>
      </Switch>
    </Router>
  );
};

const renderHomeRedirect = () => <Redirect to={ROUTE_PATHS.home} />;

interface CustomRouteHandlerProps {
  component: typeof Route;
  featureKey?: string;
  routeProps: RouteComponentProps;
}

const FeatureRouteHandler = ({ component: Component, ...props }: CustomRouteHandlerProps) => {
  return (
    <FeatureGuard contentKey={props.featureKey} disabledHandler={renderHomeRedirect}>
      <Component {...props.routeProps} />
    </FeatureGuard>
  );
};

function mapToRoutes(routes: AppRoute[], RouteComponent: typeof Route | typeof SecureRoute) {
  return routes.map((route) => {
    return (
      <RouteComponent
        exact
        key={route.path}
        path={route.path}
        render={(routeProps) => (
          <FeatureRouteHandler component={route.component} featureKey={route.featureKey} routeProps={routeProps} />
        )}
      />
    );
  });
}

const AdminRouteHandler = ({ component: Component, ...props }: CustomRouteHandlerProps) => {
  const isAuthenticated = useSelector((state: AppRootState) => !!state.auth.session?.user);
  const isAdmin = useSelector((state: AppRootState) => state.auth?.isAdmin);

  // See if the value even exists. If it doesn't, authentication hasn't happened yet so wait until it auth is done.
  if (isAdmin === undefined) return null;

  if (!isAuthenticated || (isAuthenticated && !isAdmin)) return renderHomeRedirect();

  return <Component {...props.routeProps} />;
};

function mapToAdminRoutes(routes: AppRoute[], RouteComponent: typeof Route | typeof SecureRoute) {
  return routes.map((route) => {
    return (
      <RouteComponent
        exact
        key={route.path}
        path={route.path}
        render={(routeProps) => (
          <FeatureGuard contentKey={route.featureKey} disabledHandler={renderHomeRedirect}>
            <AdminRouteHandler component={route.component} routeProps={routeProps} />
          </FeatureGuard>
        )}
      />
    );
  });
}
