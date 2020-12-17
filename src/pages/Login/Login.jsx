import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogContent, Typography, Button, TextField, InputAdornment, makeStyles,
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import * as yup from 'yup';

export const useStyle = makeStyles((theme) => ({
  flexcolumnCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  iconRound: {
    padding: '5px',
    borderRadius: '50%',
    background: theme.palette.secondary.main,
    color: 'white',
    margin: '20px',
  },
  buttonLogin: {
    marginTop: '25px',
  },
}));

const LoginUi = (props) => {
  const { open } = props;
  const classes = useStyle();
  const schema = yup.object().shape({
    Email: yup.string().required('Email is required').email(),
    Password: yup.string().required('Password is required').matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must contain at least 8 characters with at least one uppercase, one lowercase, one number, one special character',
    ),
  });

  const [state, setstate] = useState({
    Email: '', Password: '',
  });

  const [onBlur, setBlur] = useState({
    Email: false, Password: false,
  });

  const handleBlur = (label) => {
    setBlur({ ...onBlur, [label]: true });
  };

  const isTouched = () => (onBlur.Email || onBlur.Password);

  const hasErrors = () => {
    try {
      schema.validateSync(state);
    } catch (err) {
      return true;
    }
    return false;
  };

  const getError = (label) => {
    if (onBlur[label] && hasErrors()) {
      try {
        schema.validateSyncAt(label, state);
      } catch (err) {
        return err.message;
      }
    }
    return null;
  };

  const handleEmailField = (input) => {
    setstate({
      ...state, Email: input.target.value,
    });
  };

  const handlePasswordField = (input) => {
    setstate({
      ...state, Password: input.target.value,
    });
  };

  const hangleLogin = () => {
    console.log(state);
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xs"
    >
      <DialogContent className={classes.flexcolumnCenter}>
        <LockOutlinedIcon className={classes.iconRound} />
        <Typography variant="h5">
          Login
        </Typography>
        <form>
          <TextField
            required
            fullWidth
            size="small"
            margin="normal"
            error={!!getError('Email')}
            helperText={getError('Email')}
            onChange={handleEmailField}
            onBlur={() => handleBlur('Email')}
            label="Email"
            InputProps={{
              startAdornment: <InputAdornment position="start"><EmailIcon style={{ fontSize: 20 }} opacity="0.6" /></InputAdornment>,
            }}
            variant="outlined"
          />
          <TextField
            required
            fullWidth
            margin="normal"
            size="small"
            type="password"
            error={!!getError('Password')}
            helperText={getError('Password')}
            onChange={handlePasswordField}
            onBlur={() => handleBlur('Password')}
            label="Password"
            InputProps={{
              startAdornment: <InputAdornment position="start"><VisibilityOffIcon style={{ fontSize: 20 }} opacity="0.6" /></InputAdornment>,
            }}
            variant="outlined"
          />
          <Button className={classes.buttonLogin} fullWidth disabled={hasErrors() || !isTouched()} onClick={hangleLogin} color="primary" variant="contained">
            Login
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

LoginUi.propTypes = {
  open: PropTypes.bool,
};

LoginUi.defaultProps = {
  open: true,
};

export default LoginUi;
