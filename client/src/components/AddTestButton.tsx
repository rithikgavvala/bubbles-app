import React, { useState } from 'react';
import PopModal from './PopModal';
import { Button } from '@chakra-ui/react';

const AddTestButton: React.FC = () => {
  const [isPopModalOpen, setPopModalOpen] = useState<boolean>(false);

  const onOpenPop = () => {
    setPopModalOpen(true);
  };

  return (
    <>
      <Button bg="#FEB2B2" height="4rem" onClick={onOpenPop} borderRadius="100%" color="white">
        Pop!
      </Button>
      <PopModal open={isPopModalOpen} closeModal={() => setPopModalOpen(false)} />
    </>
  );
};

export default AddTestButton;
