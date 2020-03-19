import React from 'react';
import Header from '../Header';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  toolbar: {
    width: '100%',
    marginBottom: theme.spacing(3),
    ...(theme.overrides && theme.overrides.MuiToolbar && theme.overrides.MuiToolbar.regular),
  },
}));

export const Layout : React.FC = ({children}) => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <div className={classes.toolbar} />
      <Container component="main" maxWidth="lg">
        { children }
      </Container>
    </>
  )
}

export default Layout;
