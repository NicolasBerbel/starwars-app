import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';
import { characterStore } from '../../store/Character';

const useStyles = makeStyles( theme => ({
  toolbar: {
    paddingRight: 0,
    paddingLeft: 0,
    color: theme.palette.common.white
  },
  progress: {
    marginBottom: -4,
  }
}));

export const Header : React.FC = () => {
  const classes = useStyles();
  const { state } = React.useContext(characterStore);
  const { loading } = state;

  return (
    <AppBar color="primary" elevation={2}>
      <Toolbar className={classes.toolbar}>
        <Container>
          <Box display='flex' alignItems='center' justifyContent='space-between' flexWrap='wrap'>
            <Typography color="inherit" variant="h5">Star Wars App</Typography>
          </Box>
        </Container>
      </Toolbar>
      <Fade in={loading}>
        <LinearProgress className={classes.progress} color='secondary'/>
      </Fade>
    </AppBar>
  )
}

export default Header;
