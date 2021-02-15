import React from 'react';
import { Route } from 'react-router-dom';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  const access_token = sessionStorage.getItem('access_token');

  return (
    <Route
      {...rest}
      render={matchProps => (
        // access_token ?
        <Layout>
          <Component {...matchProps} />
        </Layout>
        // : (
        //   <Redirect to="/sign-in"
        //   />
        // )
      )}
    />
  );
};

export default RouteWithLayout;
