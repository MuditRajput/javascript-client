import React from 'react';
import {
  makeStyles, AppBar, Toolbar, Typography, Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '20px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Trainee Portal
          </Typography>
          <Button href="/" color="inherit">Trainee</Button>
          <Button href="/text-field-demo" color="inherit">TEXTFIELD DEMO</Button>
          <Button href="/input-demo" color="inherit">INPUT DEMO</Button>
          <Button href="/children-demo" color="inherit">CHILDREN DEMO</Button>
          <Button color="inherit">LOGOUT</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
