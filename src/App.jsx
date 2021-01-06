import React from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { SnackBarProvider } from './contexts';

import { AuthRoute, PrivateRoute } from './routes';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <CssBaseline />
        <Router>
          <Switch>
            <Route path="/login" component={AuthRoute} />
            <Route default component={PrivateRoute} />
          </Switch>
        </Router>
      </SnackBarProvider>
    </ThemeProvider>
  );
}

export default App;
