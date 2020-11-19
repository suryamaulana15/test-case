import React, {Fragment} from "react";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import ScrollToTop from "./hoc/ScrollToTop/ScrollToTop";
import {Router} from "react-router-dom";

// Clear Cache
import { useClearCache } from 'react-clear-cache';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@material-ui/core';

import Routes from './Routes';

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const App = props => {
  const { isLatestVersion, emptyCacheStorage } = useClearCache();

  return (
    <Fragment>
      {!isLatestVersion && (
        <Dialog
          open={true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Store info"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Update aplikasi nya dulu yuk
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary">
              Tidak
            </Button>
            <Button
              onClick={e => {
                e.preventDefault();
                emptyCacheStorage();
              }}
              color="primary"
              autoFocus
            >
              Ya
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Router history={history}>
        <ScrollToTop />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Routes/>
        </MuiPickersUtilsProvider>
      </Router>
    </Fragment>
  );
};

export default App;
