import React from 'react';
import { characterStore, ICharacterListResponse } from '../../store/Character';
import api from '../../services/api';
import MuiPagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
  },
  ul: {
    justifyContent: 'center',
  }
}))

export const Pagination : React.FC = () => {
  const [selectedPage, setSelectedPage] = React.useState(1);
  const {state, dispatch} = React.useContext(characterStore);
  const { pageNumber, pages, loading, totalPages } = state;
  const page = pages[pageNumber]
  const classes = useStyles();
  
  React.useEffect(() => {
    dispatch({type: 'request'});

    api.get<ICharacterListResponse>('/people', { params: { page: selectedPage }})
      .then(
        res => dispatch({type: 'success', response: res.data}),
        () => dispatch({type: 'failure', error: 'An error occured during the character request, please try again later!'})
      );
  }, [selectedPage, dispatch])

  const handleChange = (e : React.ChangeEvent<unknown>, page : number) => {
    setSelectedPage(page)
  };

  return (!page ? null : (
      <MuiPagination
        disabled={loading}
        classes={{...classes}}
        size="small"
        count={totalPages}
        page={selectedPage}
        onChange={(e, page) => handleChange(e, page)}
      />
    )
  )
}

export default Pagination;
