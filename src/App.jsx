import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { NavBar, TraineeComponent } from './pages';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <TraineeComponent />
    </ThemeProvider>
  );
}

export default App;
