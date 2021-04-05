import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={configureStore('')}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);