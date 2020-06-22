import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from '../components/Chart';
import Deposits from '../components/Deposits';
import Pricing from './Pricing';
import { useUsername } from '../contexts/AuthTokenContext';
import TaskTable, { Task } from '../components/TaskTable';
import { Column } from 'material-table';

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
    height: 240,
  },
}));

export default function Home() {
  const classes = useStyles();
  const username = useUsername();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const title = "My Tasks";
  const columns: Column<Task>[] =  [
    { title: 'Descriptions', field: 'description' },
    { title: 'Points', field: 'points', type: 'numeric' },
  ];
  const data = [
      {
        id: 1,
        description: 'Load Dishwasher',
        points: 200,
        user_id: 34
      },
      {
        id: 2,
        description: 'Unload Dishwasher',
        points: 200,
        user_id: 34
      },
      {
        id: 3,
        description: 'Vaccum Downstairs',
        points: 200,
        user_id: 34
      },
      {
        id: 4,
        description: 'Wipe Down Countertop',
        points: 200,
        user_id: 34
      },
      {
        id: 6,
        description: 'Swiffer Kitchen Floor',
        points: 200,
        user_id: 34
      },
      {
        id: 7,
        description: 'Take Out Trash',
        points: 200,
        user_id: 34
      },
  ];
  const actions = [
    {
      icon: 'check_circle',
      tooltip: 'Complete Task',
      onClick: (event: any, rowData: Task | Task[]) => {

      }
    }
  ];

  return (
    <>
    {username ?
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
              <Chart />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Deposits />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <TaskTable data={data} actions={actions} title={title} columns={columns} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    :
      <Pricing title="Tasks. Gameified." copy="do things. get points. feel good. Need to replace this with a real home page."/>
  
    }
    </>
  );
}
