import React from 'react';
import Status from './Status';
import { Box } from '@chakra-ui/react';

const ParentContainer: React.FC = () => {
  return (
    <>
      <Box minH="100%">
        <Status />
      </Box>
    </>
  );
};

export default ParentContainer;
