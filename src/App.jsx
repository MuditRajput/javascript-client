import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ChildrenDemo } from './pages';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ChildrenDemo />
    </ThemeProvider>
  );
}

export default App;
