
import React from 'react';
import Dashboard from './pages/Dashboard';
import LoggedInSideBar from './layouts/LoggedInSideBar';
import SignIn from './pages/SignIn';
import Pricing from './pages/Pricing';
import SignUp from './pages/SignUp';
import NotLoggedIn from './layouts/NotLoggedIn';
import Footer from './components/Footer';
import { Router, Switch } from 'react-router-dom';
import { UsernameContextProvider } from './contexts/UsernameContext';

export default function App() {
  const title = 'My new application'
  const signedIn = true;
  return (
   ( signedIn ?
      <LoggedInSideBar title={title}>
        <Dashboard />
    </LoggedInSideBar>
    :
    <NotLoggedIn title={title}>
      <SignUp />
    </NotLoggedIn>
  )
 );
}