import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { NavBar, TraineeComponent, LoginUi } from './pages';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <TraineeComponent />
      <LoginUi />
    </ThemeProvider>
  );
}

export default App;
