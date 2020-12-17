import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#7cb446',
      main: '#4b8414',
      dark: '#185700',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6659',
      main: '#d32f2f',
      dark: '#9a0007',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: [
      'Comic Sans MS',
      'cursive',
      'sans-serif',
    ],
    fontSize: 20,
  },
});

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
