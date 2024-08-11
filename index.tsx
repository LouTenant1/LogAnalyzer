import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from './config';
import App from './App';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
axios.defaults.baseURL = API_URL;
const MainComponent = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App}>
        <Route exact path="/home" component={HomePage} />
      </Route>
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);
ReactDOM.render(<MainComponent />, document.getElementById('root'));