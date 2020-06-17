import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from '../components/Chart';
import Table from '../components/TaskTable';
import { useUsername } from '../contexts/AuthTokenContext';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 440,
  },
}));

export default function Tasks() {
  const classes = useStyles();
  const username = useUsername();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Container maxWidth="lg" className={classes.container}>
      {!username && <Redirect to="/sign_in" push/>}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Paper >
            <Table />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}