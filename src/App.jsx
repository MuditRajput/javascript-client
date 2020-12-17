import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { TraineeComponent } from './pages';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TraineeComponent />
    </ThemeProvider>
  );
}

export default App;
