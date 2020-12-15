import React from 'react';
import { ChildrenDemo } from './pages';
import { theme } from './theme';

function App() {
  const classes = theme();
  return (
    <div className={classes.root}>
      <ChildrenDemo />
    </div>
  );
}

export default App;
