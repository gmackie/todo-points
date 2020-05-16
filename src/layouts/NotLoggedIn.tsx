import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MyAppBar from '../components/MyAppBar';

interface NotLoggedInProps {
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

export default function NotLoggedIn(props: NotLoggedInProps) {
  const { children, title } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MyAppBar title={title} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
      </main>
    </div>
  );
}