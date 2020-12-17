import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { TraineeComponent } from './pages';
import { useStyle, theme } from './theme';

function App() {
  const classes = useStyle();
  return (
    <ThemeProvider theme={theme} className={classes.root}>
      <TraineeComponent />
    </ThemeProvider>
  );
}

export default App;
