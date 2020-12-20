import React from 'react';
import './App.css';
import { ThemeProvider } from '@emotion/react'
import theme from './Theme/theme';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <ThemeProvider theme={theme} >
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
