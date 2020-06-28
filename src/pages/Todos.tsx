import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TodoTable, { Todo } from '../components/TodoTable';
import { useUsername } from '../contexts/AuthTokenContext';
import { Redirect } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { Typography, Icon } from '@material-ui/core';
import { Column } from 'material-table';
import { Response } from './Labels';
import useAxios from '../hooks/useAxios';

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
    flexGrow: 1,
  },
  fixedHeight: {
    height: 440,
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}


export default function Todos() {
  const classes = useStyles();
  const username = useUsername();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const [{ data: todosData, loading: todosLoading, error: todosError }, refetchTodos] = useAxios()<Response<Todo[]>>('/api/todos');
  const [{ data: addData, loading: addLoading, error: addError }, addTodo] = useAxios()<Response<Todo>>({
      url: '/api/todos',
      method: 'POST',
    },
    { manual: true }
  );
  const [{ data: deleteData, loading: deleteLoading, error: deleteError }, deleteTodo] = useAxios()({
      method: 'DELETE',
    },
    { manual: true }
  );

  const data = (todosData && todosData.data) ? todosData.data : [];
  const editable = {
    onRowAdd: (newTodo: Todo) => {
      const data = {
        description: newTodo.description,
        points: newTodo.points,
        user_id: username,
      };
      console.log(data)
      return addTodo({
        data: data,
      })
      .then(() => refetchTodos());
    },
    onRowDelete: (oldTodo: Todo) => {
      const url = `/api/todos/${oldTodo.id}`;
      return deleteTodo({
        url: url,
      })
      .then(() => refetchTodos());
    },
  };

  const title = "My Todos";
  const columns: Column<Todo>[] =  [
    { title: 'Descriptions', field: 'description' },
    { title: 'Points', field: 'points', type: 'numeric' },
  ];
  const actions = [
    {
      icon: 'check_circle',
      tooltip: 'Complete Todo',
      onClick: (event: any, rowData: Todo | Todo[]) => {

      }
    }
  ];
  
  
  return (
    <Container maxWidth="lg" className={classes.container}>
      {!username && <Redirect to="/sign_in" push/>}
      <Paper className={classes.paper}>
        <Typography variant="h2" gutterBottom>Todos</Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="My Todos" icon={<Icon>assignment_ind</Icon>} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper >
                <TodoTable data={data} columns={columns} actions={actions} title={title} editable={editable}/>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Container>
  );
}
