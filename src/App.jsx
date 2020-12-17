import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ChildrenDemo } from './pages';
import { theme, useStyle } from './theme';

function App() {
  const classes = useStyle();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.fontLarge}>
        <ChildrenDemo />
      </div>
    </ThemeProvider>
  );
}

export default App;
