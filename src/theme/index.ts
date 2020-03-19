import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00BCD4',
      contrastText: '#fff'
    },
    secondary: {
      main: '#E91E63',
    },
  },
  props: {
    MuiButton: {
      variant: 'contained',
      color: 'primary'
    },
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiIcon: {
      fontSize: 'small'
    },
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
    minHeight: 90,
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
