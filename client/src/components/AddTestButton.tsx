import React, { useState } from 'react';
import AddTestModal from './AddTestModal';
import { Box, Button } from '@chakra-ui/react';

const AddTestButton: React.FC = () => {
  const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);

  const onAddOpen = () => {
    setAddModalOpen(true);
  };

  return (
    <>
    <Box
      paddingLeft="1.5rem"
      paddingRight="1.5rem"
    >
    <Button size="lg" bg="#3182CE" paddingRight="1.5rem" width="100%" borderRadius="8px" onClick={onAddOpen}  color="white">
        Add Test
      </Button>
      <AddTestModal open={isAddModalOpen} closeModal={() => setAddModalOpen(false)} />
    </Box>
   
    </>
  );
};

export default AddTestButton;
