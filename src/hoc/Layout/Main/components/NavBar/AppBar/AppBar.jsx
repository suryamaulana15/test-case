import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'

import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'

import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
// import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle'
import ToolBarComponent from './ToolBar/ToolBarComponent'
import { Link, NavLink } from 'react-router-dom'
// import Notifications from './ToolBar/Notifications/Notifications'
// import * as actions from '../../../../../store/actions/index';
// import { connect } from 'react-redux'
const drawerWidth = 240
const appDrawerBlue = '#011747'
// const appDrawerDefault = '#FFFFFF';

const iconBlack = '#000000'

const useStyles = makeStyles(theme => ({
  root: {

    display: 'flex'
  },
  content: {
    flexGrow: 1,
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  logo: {
    width: 'auto',
    height: 50,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  logo_min: {
    width: 'auto',
    height: 30
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: theme.palette.main.primary
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade('#f5f5f5', 0.15),
    // '&:hover': {
    //   backgroundColor: fade('#f5f5f5', 0.25),
    // },
    backgroundColor: '#f5f5f5',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: iconBlack
  },
  inputRoot: {
    color: iconBlack
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}))

const Appbar = props => {
  const { open } = props

  const classes = useStyles()
  // const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <NavLink to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </NavLink>
      <NavLink to="/logout" style={{ textDecoration: 'none', color: 'inherit' }}>
        <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
      </NavLink>
      
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to="/notification" style={{ textDecoration: 'none', color: 'inherit' }}
            // onClick={() => onReadNotification(token)}
      >
        <MenuItem >
          {/*<Notifications />*/}
          <p>Notifications</p>
        </MenuItem>
      </Link>
      <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }} >
        <MenuItem>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Link>
    </Menu>
  )

  return (
    // <div className={classes.flexGrow}>
    <AppBar
      position="fixed"
      // color="inherit"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open
      })}
    >
      <ToolBarComponent
        open={open}
        clicked={props.clicked}
        clickedprofile={handleProfileMenuOpen}
        clickedmobileprofile={handleMobileMenuOpen}
      />
      {renderMobileMenu}
      {renderMenu}
    </AppBar>
    // </div>
  )
}

export default Appbar;
