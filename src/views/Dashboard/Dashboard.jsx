import React, {Fragment} from 'react';
import {Grid, Typography} from "@material-ui/core";

const Dashboard = props => {
  return (
    <Fragment>
      <Grid container justify="space-between">
        <Grid item>
          <Typography variant="h3">Dashboard</Typography>
        </Grid>
      </Grid>

    </Fragment>
  );
};

export  default Dashboard;