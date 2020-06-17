
import React from 'react';
import Tasks from './pages/Tasks';
import Todos from './pages/Todos';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import Pricing from './pages/Pricing';
import SignUp from './pages/SignUp';
import Copyright from './components/Copyright';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from 'react-router-dom';
import { useUsername } from './contexts/AuthTokenContext';
import SideBarLayout from './layouts/SideBarLayout';
import Home from './pages/Home';
import Box from '@material-ui/core/Box';
import Achievements from './pages/Achievements';
import Labels from './pages/Labels';

export default function App() {
  const title = 'Task Points'
  const username = useUsername();
  console.log(username);
  return (
      <Router>
        <SideBarLayout title={title}>
          <Switch>
            <Route path="/tasks">
              <Tasks />
            </Route>
            <Route path="/sign_up">
              <SignUp/>
            </Route>
            <Route path="/sign_in">
              <SignIn />
            </Route>
            <Route path="/pricing">
              <Pricing title="Tasks. Gameified." copy="do things. get points. feel good. now you really want to buy."/>
            </Route>
            <Route path="/achievements">
              <Achievements />
            </Route>
            <Route path="/profile">
              <Profile/>
            </Route>
            <Route path="/labels">
              <Labels />
            </Route>
            <Route path="/todos">
              <Todos />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Box pt={4}>
            <Copyright />
          </Box>
        </SideBarLayout>
      </Router>
 );
}