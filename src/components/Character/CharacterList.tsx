import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { characterStore } from '../../store/Character';
import CharacterPagination from './CharacterPagination';
import Character from './Character';

const useStyles = makeStyles( theme => ({
  root: {
    marginTop: theme.spacing(1),
  },
  bar: {
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    top: 40 + theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      top: 40 + theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      top: 60 + theme.spacing(2),
    },
  },
}))

export const CharacterList : React.FC = () => {
  const classes = useStyles();
  const { state } = React.useContext(characterStore);
  const { loading, pages, pageNumber, error } = state;

  return (
    <>
    <AppBar position="sticky" elevation={loading ? 0 : 2} color={loading ? 'transparent' : 'inherit'} className={classes.bar}>
      <Box padding={2}>
        <CharacterPagination />
      </Box>
    </AppBar>
    {error ? error : (
      loading ? (
        <Box padding={2}>Loading...</Box>
      ) : (
        <>
          {pages[pageNumber] && (
            <Grid container spacing={3} className={classes.root}>
              {Object.entries(pages[pageNumber].items).map(
                ([id, character]) => (
                  <Grid key={id} item xs={12} sm={6} md={4} lg={3}>
                    <Character {...character} />
                  </Grid>
                )
              )}
            </Grid>
          )}
        </>
      )
    )}
    </>
  )
}

export default CharacterList;
