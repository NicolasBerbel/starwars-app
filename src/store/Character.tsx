import React from 'react';
import {IApiListResponse} from '../services/api';

export interface ICharacterListResponse extends IApiListResponse<ICharacterResponse> {};
export interface ICharacterResponse {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
}
export interface ICharacter extends ICharacterResponse { id: number }
export interface ICharacterPage extends ICharacterListResponse { id: number, items: ICharacterList }

export type ICharacterPageList = {
  [id : number] : ICharacterPage
}

export type ICharacterList = {
  [id : number] : ICharacter
}

interface ICharacterState {
  pageNumber: number,
  totalPages: number,
  pages: ICharacterPageList,
  characters: ICharacterList,
  loading: boolean,
  error: string,
}

const initialState : ICharacterState = {
  totalPages: 0,
  pageNumber: 0,
  pages: {},
  characters: {},
  loading: false,
  error: '',
}

export const characterStore = React.createContext({
  state: initialState,
  dispatch: (action : CharacterAction) => {}
});
const { Provider } = characterStore;

type CharacterAction =
 | { type: 'request' }
 | { type: 'success', response: ICharacterListResponse }
 | { type: 'failure', error: string };

export const CharacterProvider : React.FC = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state : ICharacterState, action : CharacterAction) => {
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

          const items = action.response.results.reduce<ICharacterList>((characters, character) => {
            const id = parseInt(character.url.split('/').reverse()[1]);

            return {
              ...characters,
              [id]: { id, ...character }
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
            characters: {
              ...state.characters,
              ...page.items
            }
          }
        case 'failure':
          return {
            ...state,
            loading: false,
            error: action.error
          }
        default:
          return state;
      };
    }, initialState);
  
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}
