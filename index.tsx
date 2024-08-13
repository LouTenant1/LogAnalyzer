import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from './config';
import RootComponent from './App'; // Assuming App is the main or root component
import DashboardPage from './components/HomePage'; // Assuming HomePage acts as a dashboard
import PageNotFound from './components/NotFoundPage'; // More direct naming
axios.defaults.baseURL = API_URL;

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={RootComponent}>
        <Route exact path="/home" component={DashboardPage} />
      </Route>
      <Route component={PageNotFound} />
    </Switch>
  </Router>
);

ReactDOM.render(<AppRouter />, document.getElementById('root'));