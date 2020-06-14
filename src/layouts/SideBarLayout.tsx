import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Menu from '../components/Menu';
import MyAppBar from '../components/MyAppBar';
import { useUsername } from '../contexts/AuthTokenContext';

interface SideBarLayoutProps {
  children?: ReactNode;
  title?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function SideBarLayout(props: SideBarLayoutProps) {
  const { children, title } = props;
  const classes = useStyles();
  const username = useUsername();
  const loggedIn = Boolean(username);
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <MyAppBar loggedIn={loggedIn} open={open} handleDrawerOpen={handleDrawerOpen} title={title} />
      {loggedIn && <Menu open={open} handleDrawerClose={handleDrawerClose} />}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
      </main>
    </div>
  );
}