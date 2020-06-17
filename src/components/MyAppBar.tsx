import React, { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';
import { useUsername, useSetAuthToken } from '../contexts/AuthTokenContext';
import { useSnackbar } from 'notistack';
import Avatar from '@material-ui/core/Avatar';
import AppBarButton from './AppBarButton';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(2.5, 1.5),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
        sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
}));

interface MyAppBarProps {
  handleDrawerOpen?: MouseEventHandler;
  loggedIn?: boolean;
  open?: boolean;
  title?: string;
}

export default function MyAppBar(props: MyAppBarProps) {
  const classes = useStyles();
  const username = useUsername();
  const setAuthToken = useSetAuthToken();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const logout = () => {
    enqueueSnackbar('You have been signed out', {
      variant: 'info',
    })
    setAuthToken(null);    
    history.push('/sign_in');
  };

  const { handleDrawerOpen, loggedIn, open, title } = props;
  return (
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {handleDrawerOpen && loggedIn &&
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
          }
          <Typography variant="h6" noWrap className={classes.toolbarTitle}>
            {title}
          </Typography>
          {loggedIn ? 
            <div className={classes.sectionDesktop}>
              <AppBarButton url="/profile">
                <Badge badgeContent={"15+"} color="error">
                  <Avatar alt={username} src="https://material-ui.com/static/images/avatar/1.jpg" />
                </Badge>
              </AppBarButton>
              <AppBarButton >
                <Badge badgeContent={"15+"} color="error">
                  <NotificationsIcon />
                </Badge>
              </AppBarButton>
              <AppBarButton>
                <SettingsIcon />
              </AppBarButton>
              <Link variant="button" color="textPrimary" onClick={logout} className={classes.link}>
                Logout
              </Link>
            </div>
          :
            <nav>
              <Link href="/sign_in" color="textPrimary" className={classes.link}>
                Login
              </Link>
            </nav>
          }
        </Toolbar>
      </AppBar>
  );
}