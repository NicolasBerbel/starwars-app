import React from 'react';
import AppTheme from './AppTheme';
import Layout from '../Layout';
import { StarshipProvider } from '../../store/Starship';
import { CharacterProvider } from '../../store/Character';
import { CharacterList } from '../Character';

export const App : React.FC = () => {
  return (
    <StarshipProvider>
      <CharacterProvider>
        <AppTheme>
          <Layout>
            <CharacterList />
          </Layout>
        </AppTheme>
      </CharacterProvider>
    </StarshipProvider>
  )
}

export default App;
