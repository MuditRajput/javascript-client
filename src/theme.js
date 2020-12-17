import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  Typography: {
    fontFamily: [
      'Comic Sans MS',
      'cursive',
      'sans-serif',
    ],
    fontSize: 20,
  },
});

export const useStyle = makeStyles(() => ({
  fontLarge: {
    fontSize: '15px',
  },
}));
