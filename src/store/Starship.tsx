import React from 'react';
import {IApiListResponse} from '../services/api';

export interface IStarshipListResponse extends IApiListResponse<IStarshipResponse> {};
export interface IStarshipResponse {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
}
export interface IStarship extends IStarshipResponse { id: number }
export interface IStarshipPage extends IStarshipListResponse { id: number, items: IStarshipList }

export type IStarshipPageList = {
  [id : number] : IStarshipPage
}

export type IStarshipList = {
  [id : number] : IStarship
}

interface IStarshipState {
  pageNumber: number,
  totalPages: number,
  pages: IStarshipPageList,
  starships: IStarshipList,
  loadingStarships: number[],
  errorStarships: number[],
  loading: boolean,
  error: string,
}

const initialState : IStarshipState = {
  totalPages: 0,
  pageNumber: 0,
  pages: {},
  starships: {},
  loadingStarships: [],
  errorStarships: [],
  loading: false,
  error: '',
}

export const starshipStore = React.createContext({
  state: initialState,
  dispatch: (action : StarshipAction) => {}
});
const { Provider } = starshipStore;

type StarshipAction =
  | { type: 'request' }
  | { type: 'success', response: IStarshipListResponse }
  | { type: 'failure', error: string }
  | { type: 'request-single', id: number }
  | { type: 'success-single', response: IStarshipResponse }
  | { type: 'failure-single', id: number };

const getId = (s : IStarshipResponse | IStarship ) => parseInt(s.url.split('/').reverse()[1]);

export const StarshipProvider : React.FC = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state : IStarshipState, action : StarshipAction) => {
      switch(action.type) {
        case 'request':
          return {
            ...state,
            loading: true,
          };
        case 'success':
          const totalPages = state.totalPages || Math.ceil(action.response.count / 10); 
          const pageNumber = action.response.previous
            ? parseInt(action.response.previous.split('page=')[1]) + 1
            : 1;

          const items = action.response.results.reduce<IStarshipList>((starships, starship) => {
            const id = getId(starship);

            return {
              ...starships,
              [id]: { id, ...starship }
            };
          }, {});

          const page = {
            ...action.response,
            id: pageNumber,
            items,
          }

          const pages = {
            ...state.pages,
            [pageNumber]: page,
          };

          return {
            ...state,
            loading: false,
            totalPages,
            pageNumber,
            pages,
            starships: {
              ...state.starships,
              ...page.items
            }
          }
        case 'failure':
          return {
            ...state,
            loading: false,
            error: action.error
          }
        case 'request-single':
          return {
            ...state,
            loadingStarships: [
              ...state.loadingStarships,
              action.id
            ]
          };
        case 'success-single':
          const id = getId(action.response);

          return {
            ...state,
            starships: {
              ...state.starships,
              [id]: { id, ...action.response }
            },
            loadingStarships: state.loadingStarships.filter(l => l !== id ),
          };
        case 'failure-single':
          return {
            ...state,
            loadingStarships: state.loadingStarships.filter(l => l !== action.id ),
            errorStarships: [...state.errorStarships, action.id]
          }
        default:
          return state;
      };
    }, initialState);
  
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}
