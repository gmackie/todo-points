import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Menu from '../components/Menu';
import MyAppBar from '../components/MyAppBar';

interface LoggedInSideBarProps {
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

export default function LoggedInSideBar(props: LoggedInSideBarProps) {
  const { children, title } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <MyAppBar loggedIn open={open} handleDrawerOpen={handleDrawerOpen} title={title} />
      <Menu open={open} handleDrawerClose={handleDrawerClose} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
      </main>
    </div>
  );
}