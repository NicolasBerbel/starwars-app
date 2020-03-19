import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Character from './Character';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { characterStore } from '../../store/Character';
import CharacterPagination from './CharacterPagination';

const useStyles = makeStyles(() => ({
  root: {
  }
}))

export const CharacterList : React.FC = () => {
  const classes = useStyles();
  const { state } = React.useContext(characterStore);
  const { loading, pages, pageNumber, error } = state;

  return (
    <>
    <Box mb={2} justifyContent='center'>
      <CharacterPagination />
    </Box>
    {error ? error : (
      loading ? 'Loading...' : (
        pages[pageNumber] && (
        <Grid container spacing={3} className={classes.root}>
          {Object.entries(pages[pageNumber].items).map( ([id, character]) => (
            <Grid key={id} item xs={12} sm={6} md={4} lg={3}>
              <Character {...character} />
            </Grid>
          ) )}
        </Grid>
        )
      )
    )}
    </>
  )
}

export default CharacterList;
