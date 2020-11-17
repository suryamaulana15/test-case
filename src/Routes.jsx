import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import RouteWithLayout from './components/RouteWithLayout/RouteWithLayout';
import MainLayout from './hoc/Layout/Main/Main';


import {
  Login as LoginView,
  Dashboard as DashboardView,
} from './views';

const Routes = () => {

  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <Route
        component={LoginView}
        exact
        // layout={Login}
        path="/sign-in"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;

