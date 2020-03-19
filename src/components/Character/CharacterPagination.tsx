import React from 'react';
import { characterStore, ICharacterListResponse } from '../../store/Character';
import api from '../../services/api';
import MuiPagination from '@material-ui/lab/Pagination';

export const Pagination : React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const {state, dispatch} = React.useContext(characterStore);
  const { pageNumber, pages, loading, totalPages } = state;
  const page = pages[pageNumber]

  React.useEffect(() => {

    dispatch({type: 'request'});

    api.get<ICharacterListResponse>('/people', { params: { page: currentPage }})
      .then(
        res => dispatch({type: 'success', response: res.data}),
        () => dispatch({type: 'failure', error: 'An error occured during the character request, please try again later!'})
      );
  }, [currentPage, dispatch])

  const handleChange = (e : React.ChangeEvent<unknown>, page : number) => {setCurrentPage(page)};

  return (!page ? null :
    <MuiPagination
      disabled={loading}
      size="small"
      count={totalPages}
      page={currentPage}
      onChange={(e, page) => handleChange(e, page)}
    />
  )
}

export default Pagination;
