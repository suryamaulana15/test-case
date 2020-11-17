import React, { useState } from 'react'

// import PropTypes from 'prop-types';
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useMediaQuery, Hidden } from '@material-ui/core'

import Footer from './components/Footer';
import AppBar from './components/NavBar/AppBar/AppBar'
// import { Footer, AppBar, AccountName } from './components';

import Aux from '../../Aux/Aux'
import SideBarComponent from './components/NavBar/SideBar/SideBarComponent';

const drawerWidth = 240;
const drawerColorBlue = '#011747';

const textMenuWhite = '#FFFFFF';

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
    backgroundColor: drawerColorBlue
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

const Main = props => {
  const classes = useStyles()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  })

  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Aux>
      <div
        className={clsx({
          [classes.root]: true,
          [classes.shiftContent]: isDesktop
        })}
      >
        <AppBar clicked={handleDrawerOpen} open={open} setOpen={setOpen} />
        <SideBarComponent open={open} closed={handleDrawerClose} clicked={handleDrawerOpen}/>
        <main
          className={classes.content}
        >
          {props.children}
          <Hidden only={['xs', 'sm']}>
            <Footer />
          </Hidden>
        </main>

      </div>

    </Aux>
  )
}

export default Main
