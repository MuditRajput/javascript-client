import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  DialogActions, Dialog, DialogContentText, DialogContent,
  DialogTitle, Button, TextField, InputAdornment, makeStyles,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import * as yup from 'yup';

export const useStyle = makeStyles(() => ({
  margin: {
    margin: '10px 0',
  },
  color: {
    primary: '#2540c1',
  },
  flexRow: {
    display: 'flex',
    alignContent: 'space-between',
    margin: '10px 0',
  },
  flexElements: {
    marginLeft: '15px',
  },
}));

const TraineeComponent = (props) => {
  const { open, onClose, onSubmit } = props;
  const classes = useStyle();
  const schema = yup.object().shape({
    Name: yup.string().required('Name is required').min(3, 'should have more then 3 characters'),
    Email: yup.string().required('Email is required').email(),
    Password: yup.string().required('Password is required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must contain at least 8 characters with at least one uppercase, one lowercase, one number, one special character'),
    Confirm: yup.string().required('Required').oneOf([yup.ref('Password'), null], 'Confirm Password is different'),
  });

  const [state, setstate] = useState({
    Name: '', Email: '', Password: '', Confirm: '',
  });

  const [onBlur, setBlur] = useState({
    Name: false, Email: false, Password: false, Confirm: false,
  });

  const handleBlur = (label) => {
    setBlur({ ...onBlur, [label]: true });
  };

  const isTouched = () => (onBlur.Name || onBlur.Email || onBlur.Password || onBlur.Confirm);

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

  const handleNameField = (input) => {
    setstate({
      ...state, Name: input.target.value,
    });
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

  const handleConfirmField = (input) => {
    setstate({
      ...state, Confirm: input.target.value,
    });
  };

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={onClose}
      maxWidth="md"
    >
      <DialogTitle>
        Add Trainee
      </DialogTitle>
      <DialogContent>
        <DialogContentText fontSize={16}>
          Enter Your Trainee Details
        </DialogContentText>
        <TextField
          required
          fullWidth
          error={!!getError('Name')}
          helperText={getError('Name')}
          className={classes.margin}
          onChange={handleNameField}
          onBlur={() => handleBlur('Name')}
          label="Name"
          id="outlined-start-adornment"
          InputProps={{
            startAdornment: <InputAdornment position="start"><AccountCircleIcon opacity="0.6" /></InputAdornment>,
          }}
          variant="outlined"
        />
        <TextField
          required
          fullWidth
          error={!!getError('Email')}
          helperText={getError('Email')}
          className={classes.margin}
          onChange={handleEmailField}
          onBlur={() => handleBlur('Email')}
          label="Email"
          InputProps={{
            startAdornment: <InputAdornment position="start"><EmailIcon opacity="0.6" /></InputAdornment>,
          }}
          variant="outlined"
        />
        <div className={classes.flexRow}>
          <TextField
            required
            fullWidth
            type="password"
            error={!!getError('Password')}
            helperText={getError('Password')}
            onChange={handlePasswordField}
            onBlur={() => handleBlur('Password')}
            label="Password"
            InputProps={{
              startAdornment: <InputAdornment position="start"><VisibilityOffIcon opacity="0.6" /></InputAdornment>,
            }}
            variant="outlined"
          />
          <TextField
            required
            fullWidth
            type="password"
            error={!!getError('Confirm')}
            helperText={getError('Confirm')}
            className={classes.flexElements}
            onChange={handleConfirmField}
            onBlur={() => handleBlur('Confirm')}
            label="Confirm Password"
            InputProps={{
              startAdornment: <InputAdornment position="start"><VisibilityOffIcon opacity="0.6" /></InputAdornment>,
            }}
            variant="outlined"
          />
        </div>
      </DialogContent>
      <DialogActions className={classes.margin}>
        <Button autoFocus onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button disabled={hasErrors() || !isTouched()} onClick={() => onSubmit(state)} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

TraineeComponent.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

TraineeComponent.defaultProps = {
  open: false,
};

export default TraineeComponent;
