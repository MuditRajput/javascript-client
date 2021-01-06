import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Button, TextField, InputAdornment, makeStyles,
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
    padding: '40px 30px',
    borderRadius: '4px',
    border: '1px solid silver',
    marginTop: theme.spacing(10),
    boxSizing: 'border-box',
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

const LoginUi = () => {
  const classes = useStyle();
  const schema = yup.object().shape({
    email: yup.string().required('Email is required').email(),
    password: yup.string().required('Password is required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must contain at least 8 characters with at least one uppercase, one lowercase, one number, one special character'),
  });

  const [state, setstate] = useState({
    email: '', password: '',
  });

  const [onBlur, setBlur] = useState({});

  const [schemaErrors, setSchemaErrors] = useState({});

  const handleErrors = (errors) => {
    const schemaError = {};
    if (Object.keys(errors).length) {
      errors.inner.forEach((error) => {
        schemaError[error.path] = error.message;
      });
    }
    setSchemaErrors(schemaError);
  };

  const handleValidate = () => {
    schema.validate(state, { abortEarly: false })
      .then(() => { handleErrors({}); })
      .catch((err) => { handleErrors(err); });
  };

  const handleBlur = (label) => {
    setBlur({ ...onBlur, [label]: true });
  };

  const getError = (label) => {
    if (onBlur[label]) {
      return schemaErrors[label] || '';
    }
    return '';
  };

  useEffect(() => {
    handleValidate();
  }, [state]);

  const hasErrors = () => Object.keys(schemaErrors).length !== 0;

  const isTouched = () => Object.keys(onBlur).length !== 0;

  const handleInputField = (label, input) => {
    setstate({
      ...state, [label]: input.target.value,
    });
  };

  const hangleLogin = () => {
    console.log(state);
  };

  return (
    <Container
      maxWidth="xs"
    >
      <div className={classes.flexcolumnCenter}>
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
            error={!!getError('email')}
            helperText={getError('email')}
            onChange={(input) => handleInputField('email', input)}
            onBlur={() => handleBlur('email')}
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
            error={!!getError('password')}
            helperText={getError('password')}
            onChange={(input) => handleInputField('password', input)}
            onBlur={() => handleBlur('password')}
            label="password"
            InputProps={{
              startAdornment: <InputAdornment position="start"><VisibilityOffIcon style={{ fontSize: 20 }} opacity="0.6" /></InputAdornment>,
            }}
            variant="outlined"
          />
          <Button className={classes.buttonLogin} fullWidth disabled={hasErrors() || !isTouched()} onClick={hangleLogin} color="primary" variant="contained">
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginUi;
