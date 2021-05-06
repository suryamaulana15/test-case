import React from 'react';

import PropTypes from 'prop-types';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Account, Transaction} from "./Components";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    flex: 'none'
  },
  appBar: {
    backgroundColor: '#FFFFFF',
    boxShadow: 'none',
    // flexDirection: 'unset',
  },
  tabMargin: {
    margin: 'auto 25px'
  }
}));

const TabsCustom = withStyles((theme) => ({
  scroller: {
    flex: 'none'
  }
}))((props) => <Tabs disableRipple {...props} />);

const TabCustom = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    margin: 'auto'
  },
  wrapper: {
    fontWeight: "bold"
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const Finance = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static"  className={classes.appBar}>
        <TabsCustom
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          className={classes.tabs}
        >
          <TabCustom style={{margin: 'auto 25px'}} label="Account" {...a11yProps(0)} />
          <TabCustom style={{margin: 'auto 25px'}} label="Transaction" {...a11yProps(1)} />
        </TabsCustom>
      </AppBar>
      <hr/>

      <TabPanel value={value} index={0}>
        <Account/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Transaction/>
      </TabPanel>
    </div>
  );
};

export default Finance;