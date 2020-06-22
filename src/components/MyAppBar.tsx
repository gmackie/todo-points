import React, { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';
import { useUsername, useSetAuthToken } from '../contexts/AuthTokenContext';
import { useSnackbar } from 'notistack';
import AppBarButton from './AppBarButton';
import { Popover } from '@material-ui/core';

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
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('i click');
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? 'simple-popover' : undefined;
  const { handleDrawerOpen, open, title } = props;
  return (
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {handleDrawerOpen && username &&
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
          {username ? 
            <div className={classes.sectionDesktop}>
              <AppBarButton url="/profile" avatarSrc="https://material-ui.com/static/images/avatar/1.jpg" />
              <AppBarButton count={20} maxCount={15} badgeColor={'error'} icon="notifications" onClick={handleClick} />
              <Popover
                id={id}
                open={popoverOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Typography>Contrary to popular belief</Typography>
                <Typography>there are no new notifications... :(</Typography>
              </Popover>
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