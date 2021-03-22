import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

export const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/termosolares' component={Dashboard} />
          <Route exact path='/piscinas' component={Dashboard} />
          <Route exact path='/potencias' component={Dashboard} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    </Router>
  );
};
