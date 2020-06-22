import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TaskTable, { Task } from '../components/TaskTable';
import { useUsername } from '../contexts/AuthTokenContext';
import { Redirect } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { Typography, Icon } from '@material-ui/core';
import { Column } from 'material-table';
import FindTaskTable from '../components/FindTaskTable';
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


export default function Tasks() {
  const classes = useStyles();
  const username = useUsername();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const [{ data: tasksData, loading: tasksLoading, error: tasksError }, refetchTasks] = useAxios()<Response<Task[]>>('/api/tasks');
  const [{ data: addData, loading: addLoading, error: addError }, addTask] = useAxios()<Response<Task>>({
      url: '/api/tasks',
      method: 'POST',
    },
    { manual: true }
  );
  const [{ data: deleteData, loading: deleteLoading, error: deleteError }, deleteTask] = useAxios()({
      method: 'DELETE',
    },
    { manual: true }
  );

  const data = (tasksData && tasksData.data) ? tasksData.data : [];
  const editable = {
    onRowAdd: (newTask: Task) => {
      const data = {
        description: newTask.description,
        points: newTask.points,
        user_id: username,
      };
      console.log(data)
      return addTask({
        data: data,
      });
    },
    onRowDelete: (oldTask: Task) => {
      const url = `/api/tasks/${oldTask.id}`;
      return deleteTask({
        url: url,
      })
    },
  };

  const title = "My Tasks";
  const columns: Column<Task>[] =  [
    { title: 'Descriptions', field: 'description' },
    { title: 'Points', field: 'points', type: 'numeric' },
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
    <Container maxWidth="lg" className={classes.container}>
      {!username && <Redirect to="/sign_in" push/>}
      <Paper className={classes.paper}>
        <Typography variant="h2" gutterBottom>Tasks</Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="My Tasks" icon={<Icon>assignment_ind</Icon>} />
          <Tab label="Find Tasks" icon={<Icon>find_in_page</Icon>} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper >
                <TaskTable data={data} columns={columns} actions={actions} title={title} editable={editable}/>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper>
                <FindTaskTable />
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Container>
  );
}
