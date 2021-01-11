import React, { useState } from 'react';
import UpdateTestModal from './UpdateTestModal';
import { Button , Box} from '@chakra-ui/react';
import {Profile}  from './ParentContainer'

type Props = {
  profile: Profile
  handleProfileChange: (profile : Profile) => void
};

const UpdateTestButton: React.FC<Props>= (props: Props) => {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState<boolean>(false);

  const onUpdateOpen = () => {
    setUpdateModalOpen(true);
  };


  return (
    <>
    <Box
      paddingLeft="1.5rem"
      paddingRight="1.5rem"
    >
    <Button size="lg" bg="#3182CE" paddingRight="1.5rem" width="100%" borderRadius="8px" onClick={onUpdateOpen}  color="white">
       Update Test
      </Button>
      <UpdateTestModal profile={props.profile} handleProfileChange={props.handleProfileChange} open={isUpdateModalOpen} closeModal={() => setUpdateModalOpen(false)} />
    </Box>
   
    </>
  );
};

export default UpdateTestButton;
