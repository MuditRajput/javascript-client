import React from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { AuthRoute, PrivateRoute } from './routes';
import {
  TraineeComponent, ChildrenDemo, TextFieldDemo, InputDemo, LoginUi, NoMatch,
} from './pages';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <AuthRoute exact path="/login" component={LoginUi} />
          <PrivateRoute exact path="/" component={TraineeComponent} />
          <PrivateRoute exact path="/input-demo" component={InputDemo} />
          <PrivateRoute exact path="/text-field-demo" component={TextFieldDemo} />
          <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
          <PrivateRoute default component={NoMatch} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
