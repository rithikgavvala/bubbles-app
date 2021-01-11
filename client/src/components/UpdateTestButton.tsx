import React, { useState } from 'react';
import PopModal from './PopModal';
import { Button } from '@chakra-ui/react';

const UpdateTestButton: React.FC = () => {
  const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);

  const onAddOpen = () => {
    setAddModalOpen(true);
  };

  return (
    <>
      <Button bg="#FEB2B2" height="4rem" onClick={onAddOpen} borderRadius="100%" color="white">
        Pop!
      </Button>
      <PopModal open={isAddModalOpen} closeModal={() => setAddModalOpen(false)} />
    </>
  );
};

export default UpdateTestButton;
