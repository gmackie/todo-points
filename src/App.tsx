
import React from 'react';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import Pricing from './pages/Pricing';
import SignUp from './pages/SignUp';
import Footer from './components/Footer';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from 'react-router-dom';
import { useUsername } from './contexts/AuthTokenContext';
import SideBarLayout from './layouts/SideBarLayout';
import Home from './pages/Home';

export default function App() {
  const title = 'Task Points'
  const username = useUsername();
  console.log(username);
  return (
      <Router>
        <SideBarLayout title={title}>
          <Switch>
            <Route path="/tasks">
              <Dashboard />
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
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </SideBarLayout>
      </Router>
 );
}