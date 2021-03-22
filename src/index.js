import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppRouter} from './routers/AppRouter';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './themeConfig';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <AppRouter />
  </ThemeProvider>,
  document.getElementById('root')
);
