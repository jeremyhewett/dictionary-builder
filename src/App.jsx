import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import Store from 'state/Store';
import api from 'services/api';

// Externals
import { Chart } from 'react-chartjs-2';

// Material helpers
import { ThemeProvider } from '@material-ui/styles';

// ChartJS helpers
import { chartjs } from './helpers';

// Theme
import theme from './theme';

// Styles
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';

// Routes
import Routes from './Routes';

// Browser history
import browserHistory from 'services/history';

// Configure ChartJS
Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

let user;
try {
  user = JSON.parse(localStorage.getItem('user'));
} catch {}

export const state = new Store({
  isEditMode: false,
  user,
});

export default class App extends Component {

  componentWillMount() {
    state.watch('user', user => {
      localStorage.setItem('user', user && JSON.stringify(user));
    })
  }

  componentDidMount() {
    api.get('auth/user').then(data => {
      state.set('user', data);
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    );
  }
}
