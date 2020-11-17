import { IconButton, Toolbar } from '@material-ui/core'
import React, { Fragment } from 'react'
import { AccountCircle, Menu as MenuIcon, MoreVert as MoreIcon } from '@material-ui/icons'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
// import Notifications from './Notifications/Notifications'
// import { connect } from 'react-redux'
import Badge from '@material-ui/core/Badge'

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
    backgroundColor: appDrawerBlue
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
    marginRight: theme.spacing(1)
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

const ToolBarComponent = props => {
  const {unread_count} = props;

  const classes = useStyles()

  const menuId = 'primary-search-account-menu'
  const mobileMenuId = 'primary-search-account-menu-mobile'

  return (
    <Fragment>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.clicked}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: props.open
          })}
        >
          <MenuIcon />
        </IconButton>
        <div>
          <img src={require('../../../../../../../assets/images/logo/logo-manajemen-aset.png').default} alt="logo" width="150px" height="auto"/>
        </div>

        {/* <RouterLink to="/">
          <img
            alt="Logo"
            className={classes.logo}
            src="/images/logo/bukalapak.png"
          />
        </RouterLink> */}
        {/* <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div> */}
        <div className={classes.flexGrow} />
        <div className={classes.sectionDesktop}>
          {/* <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton> */}
          {/*<Notifications />*/}
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={props.clickedprofile}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={props.clickedmobileprofile}
            color="inherit"
          >
            <Badge badgeContent={unread_count} color="secondary">
              <MoreIcon />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </Fragment>
  )
}

// const mapStateToProps = state => {
//   return {
//     unread_count: state.notification.unread_count > 0 ? 'new' : null,
//     changing: state.notification.changing,
//   }
// }

export default (ToolBarComponent)
