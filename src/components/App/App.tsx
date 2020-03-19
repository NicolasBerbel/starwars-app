import React from 'react';
import AppTheme from './AppTheme';
import Layout from '../Layout';
import { CharacterProvider } from '../../store/Character';
import { CharacterList } from '../Character';

export const App : React.FC = () => {
  return (
    <CharacterProvider>
      <AppTheme>
        <Layout>
          <CharacterList />
        </Layout>
      </AppTheme>
    </CharacterProvider>
  )
}

export default App;
