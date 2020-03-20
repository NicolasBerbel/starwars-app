import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4CAF50',
      contrastText: '#fff'
    },
    secondary: {
      main: '#7C4DFF',
    },
  },
  props: {
    MuiButton: {
      variant: 'contained',
      color: 'primary'
    },
    MuiButtonBase: {
      disableRipple: true,
    }
  },
});
theme.overrides = theme.overrides || {};

//@ts-ignore
theme.overrides.MuiPaginationItem = {
  root: {
    color: 'inherit'
  }
}

theme.overrides.MuiToolbar = {
  gutters: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  regular: {
    minHeight: 40,
    [theme.breakpoints.up('sm')]: {
      minHeight: 60,
    },
    [theme.breakpoints.up('md')]: {
      minHeight: 60,
    },
    [theme.breakpoints.up('lg')]: {
      minHeight: 60,
    },
    [theme.breakpoints.up('xl')]: {
      minHeight: 60,
    }
  },
}

export default theme;
