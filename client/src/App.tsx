import React from 'react';
import './App.css';


import { Box } from '@chakra-ui/react';
import ParentContainer from './components/ParentContainer';


const App: React.FC = () => {
  return (
    <Box minH="100%">
      <ParentContainer />
    </Box>

  );
}

export default App;
