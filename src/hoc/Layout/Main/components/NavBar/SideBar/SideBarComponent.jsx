import {
  Button, IconButton, List, ListItem, SwipeableDrawer, ListItemIcon, ListItemText, Typography, useTheme, makeStyles, Collapse
} from '@material-ui/core'
import {
  ChevronRight as ChevronRightIcon, ChevronLeft as ChevronLeftIcon, Dashboard as DashboardIcon, 
  Input as SignOutIcon, ExpandLess, ExpandMore, DescriptionOutlined as DescriptionOutlinedIcon, BookOutlined as
  BookOutlinedIcon,
  DevicesOther
} from '@material-ui/icons'
// import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import React, { forwardRef, Fragment, useState } from 'react'
import AcountName from '../AppBar/ToolBar/AcountName'
import { Link } from 'react-router-dom'

const drawerWidth = 240
// const drawerColorBlue = '#011747'

const textMenuWhite = '#FFFFFF'

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
    display: 'flex'
  },
  button: {
    width: '100%'
  },
  content: {
    flexGrow: 1,
    paddingTop: 56,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
      paddingTop: 56,
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.main.dark,
  },
  // drawer: {
  //   width: drawerWidth,
  //   flexShrink: 0,
  //   backgroundColor: drawerColorBlue
  //   // whiteSpace: 'nowrap',
  // },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
    // backgroundColor: '#51CDFB'
  },
  menus: {
    paddingTop: theme.spacing(3)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    // '& $icon': {
    //   color: theme.palette.primary.main
    // }
  },
  flexGrow: {
    flexGrow: 1
  },
  bottomPush: {
    position: 'fixed',
    bottom: 0,
    textAlign: 'center',
    paddingBottom: 10
  },
  textMenu: {
    color: textMenuWhite,
    fontFamily: "'Nunito', sans-serif"
  }
}))

// const CustomRouterLink = forwardRef((props, ref) => (
//   <div
//     ref={ref}
//     style={{ flexGrow: 1 }}
//   >
//     {console.log(props)}
//     <RouterLink {...props} ></RouterLink>
//   </div>
// ));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <Link {...props} />
  </div>
));

const SideBarComponent = props => {
  const classes = useStyles()
  const theme = useTheme()

  const [ reportOpen, setReportOpen ] = useState(false);
  const [ masterOpen, setMasterOpen ] = useState(false);

  const handleClick = (event) => {
    if(event === 'laporan'){
      setReportOpen(!reportOpen)
    }
    if(event === 'master'){
      setMasterOpen(!masterOpen)
    }
  };

  return (
    <Fragment>
      <SwipeableDrawer
        className={classes.drawer}
        anchor="left"
        open={props.open}
        onClose={props.closed}
        onOpen={props.clicked}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={props.closed}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: textMenuWhite }} /> : <ChevronLeftIcon style={{ color: textMenuWhite }} />}
          </IconButton>
        </div>
        {props.open && <AcountName /> }

        <List
          className={classes.menus}
        >
          {/* <NavLink to="/dashboard"> */}
            <Button
              activeclassname={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              to='/dashboard'
              onClick={props.closed}
            >
              <ListItem button key='dashboard'>
                <ListItemIcon>
                  <DashboardIcon style={{ color: textMenuWhite }} />
                </ListItemIcon>
                <ListItemText secondary={<Typography type="subtitle1" className={classes.textMenu}>Dashboard</Typography>} />
              </ListItem>
            </Button>

          
          {/*<Button*/}
          {/*  activeclassname={classes.active}*/}
          {/*  className={classes.button}*/}
          {/*  // component={CustomRouterLink}*/}
          {/*  // to='/purchase-order'*/}
          {/*  onClick={() => handleClick('laporan')}*/}
          {/*>*/}
          {/*  <ListItem button key='laporan'>*/}
          {/*    <ListItemIcon>*/}
          {/*      <DescriptionOutlinedIcon style={{ color: textMenuWhite }} />*/}
          {/*    </ListItemIcon>*/}
          {/*    <ListItemText secondary={<Typography type="subtitle1" className={classes.textMenu}>Laporan</Typography>} />*/}
          {/*  </ListItem>*/}
          {/*  {reportOpen ? <ExpandLess style={{ color: textMenuWhite }} /> : <ExpandMore style={{ color: textMenuWhite }} />}*/}
          {/*</Button>*/}
          {/*<Collapse in={reportOpen} timeout="auto" unmountOnExit>*/}
          {/*  <List component="div" disablePadding>*/}
          {/*    <ListItem */}
          {/*      key='laporan-aset'*/}
          {/*      className={classes.nested}*/}
          {/*    >*/}
          {/*      <Button*/}
          {/*        fullWidth*/}
          {/*        activeClassName={classes.active}*/}
          {/*        className={classes.button}*/}
          {/*        component={CustomRouterLink}*/}
          {/*        onClick={props.closed}*/}
          {/*        to='/laporan-aset'*/}
          {/*      >*/}
          {/*          <div className={classes.textMenu}>Laporan Aset</div>*/}
          {/*      </Button>*/}
          {/*    </ListItem>*/}
          {/*  </List>*/}
          {/*  <List component="div" disablePadding>*/}
          {/*    <ListItem */}
          {/*      key='laporan-qr-aset'*/}
          {/*      className={classes.nested}*/}
          {/*    >*/}
          {/*      <Button*/}
          {/*        fullWidth*/}
          {/*        activeClassName={classes.active}*/}
          {/*        className={classes.button}*/}
          {/*        component={CustomRouterLink}*/}
          {/*        onClick={props.closed}*/}
          {/*        to='/laporan-qr-aset'*/}
          {/*      >*/}
          {/*          <div className={classes.textMenu}>Laporan QR Aset</div>*/}
          {/*      </Button>*/}
          {/*    </ListItem>*/}
          {/*  </List>*/}
          {/*</Collapse>*/}

          {/* <NavLink to="/logout"> */}
            <Button
              className={classes.button}
              component={CustomRouterLink}
              to='/logout'
              onClick={props.closed}
            >
              <ListItem button key='signout'>
                <ListItemIcon>
                  <SignOutIcon style={{ color: textMenuWhite }} />
                </ListItemIcon>
                <ListItemText secondary={<Typography type="subtitle1" className={classes.textMenu}>Sign Out</Typography>} />
              </ListItem>
            </Button>
          {/* </NavLink> */}
        </List>
      </SwipeableDrawer>
    </Fragment>
  )
}

export default SideBarComponent
