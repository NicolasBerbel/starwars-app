import React from 'react';
import AppTheme from './AppTheme';
import Layout from '../Layout';

export const App : React.FC = () => {
  return (
    <AppTheme>
      <Layout>
        <div>Hello!</div>
      </Layout>
    </AppTheme>
  )
}

export default App;
