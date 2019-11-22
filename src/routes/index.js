import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Signin from '../pages/Signin';
import Signup from '../pages/Signup';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/profile" component={Profile} />
      <Route path="/dashboard" component={Dashboard} />

      <Route path="/register" component={Signup} />
      <Route path="/" exact component={Signin} />
    </Switch>
  );
}
