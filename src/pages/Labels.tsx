import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useUsername } from '../contexts/AuthTokenContext';
import { Redirect } from 'react-router-dom';
import LabelTable, { Label } from '../components/LabelTable';
import Typography from '@material-ui/core/Typography';
import useAxios from '../hooks/useAxios';
import { random } from 'lodash';

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

// TODO: Move this somewhere good
export interface Response<T> {
  message: string;
  data: T;
}

export default function Tasks() {
  const classes = useStyles();
  const username = useUsername();

  //TODO: Use loading/error objects...
  const [{ data: labelsData, loading: labelsLoading, error: labelsError }, refetchLabels] = useAxios()<Response<Label[]>>('/api/labels');
  const [{ data: addData, loading: addLoading, error: addError }, addLabel] = useAxios()<Response<Label>>({
      url: '/api/labels',
      method: 'POST',
    },
    { manual: true }
  );
  const [{ data: deleteData, loading: deleteLoading, error: deleteError }, deleteLabel] = useAxios()({
      method: 'DELETE',
    },
    { manual: true }
  );

  const arr = (labelsData && labelsData.data) ? labelsData.data : [];
  const data = arr.map((label) => {
    const num_tasks = random(0, 1000);
    const num_todos = random(0, 1000);
    return {
      ...label,
      num_tasks,
      num_todos,
    }
  });

  const editable = {
    onRowAdd: (newLabel: Label) => {
      const data = {
        name: newLabel.name,
        color: newLabel.color,
      };
      return addLabel({
        data: data,
      });
    },
    onRowDelete: (oldLabel: Label) => {
      const url = `/api/labels/${oldLabel.id}`;
      return deleteLabel({
        url: url,
      })
    },
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      {!username && <Redirect to="/sign_in" push/>}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h2" gutterBottom>Labels</Typography>
            <LabelTable data={data} editable={editable}/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
