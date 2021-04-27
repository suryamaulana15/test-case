import React from 'react';
import { Route,Redirect } from 'react-router-dom';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  const access_token = sessionStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={matchProps => (
        access_token ?
        <Layout>
          <Component {...matchProps} />
        </Layout>
        : (
          <Redirect to="/sign-in" />
        )
      )}
    />
  );
};

export default RouteWithLayout;
