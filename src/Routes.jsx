import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import RouteWithLayout from './components/RouteWithLayout/RouteWithLayout';
import MainLayout from './hoc/Layout/Main/Main';
import Login from './hoc/Layout/Login';


import {
  // Login as LoginView,
  Dashboard as DashboardView,
  Finance as FinanceView,
  // Profile as ProfileView,
  // User as UserView,
  Produk as ProdukView,
  CreateProduk as CreateProdukView,
  Detail as DetailView,
  Edit as EditView,
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
        component={ProdukView}
        exact
        layout={MainLayout}
        path="/produk"
      />
      <RouteWithLayout
        component={EditView}
        exact
        layout={MainLayout}
        path="/produk/:id/edit"
      />
      <RouteWithLayout
        component={DetailView}
        exact
        layout={MainLayout}
        path="/produk/:id"
      />
      <RouteWithLayout
        component={CreateProdukView}
        exact
        layout={MainLayout}
        path="/create-produk"
      />
      {/*<Redirect*/}
      {/*  exact*/}
      {/*  from="/"*/}
      {/*  to="/dashboard"*/}
      {/*/>*/}
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
      {/*<RouteWithLayout*/}
      {/*  component={ProfileView}*/}
      {/*  exact*/}
      {/*  layout={MainLayout}*/}
      {/*  path="/profile"*/}
      {/*/>*/}
      {/*<RouteWithLayout*/}
      {/*  component={UserView}*/}
      {/*  exact*/}
      {/*  layout={MainLayout}*/}
      {/*  path="/user"*/}
      {/*/>*/}
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

