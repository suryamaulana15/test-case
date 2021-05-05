import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import RouteWithLayout from './components/RouteWithLayout/RouteWithLayout';
import MainLayout from './hoc/Layout/Main/Main';
import Login from './hoc/Layout/Login';


import {
  Dashboard as DashboardView,
  Finance as FinanceView,
} from './views';

const Routes = () => {

  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/sign-in"
      />

      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />

      <RouteWithLayout
        component={FinanceView}
        exact
        layout={MainLayout}
        path="/finance"
      />

      <Route
        component={Login}
        exact
        // layout={Login}
        path="/sign-in"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;

