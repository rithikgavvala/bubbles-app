import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalCloseButton,
  Button,
  HStack,
  useToast,
} from '@chakra-ui/react';

const popUserBubble = async (): Promise<any> => {
  try {
    await axios.post('/api/bubble/pop');
  } catch (e: any) {
    if (e.response) {
      throw new Error(e.response.data.message);
    } else {
      throw new Error('CANT LEAVE SORRY FAM');
    }
  }
};

type ModalProps = {
  open: boolean;
  closeModal: () => void;
};

const PopModal: React.FC<ModalProps> = (props: ModalProps) => {
  const history = useHistory();
  const toast = useToast();
  const handlePopClick = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const val = await popUserBubble();
      if (!val) {
        console.log('IN TOAST');
        toast({
          title: 'Bye!',
          description: 'You have popped the bubble!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        history.push('/join');
      } else {
        console.log('OUT TOAST');
      }
    } catch (e) {
      console.log(e);
      toast({
        title: 'Cannot leave the group',
        description: String(e),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={props.open} onClose={props.closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure want to pop the bubble?</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handlePopClick}>
          <ModalFooter>
            <HStack spacing="1em">
              <Button onClick={props.closeModal}>No</Button>
              <Button color="white" type="submit" bg="#FEB2B2">
                Yes
              </Button>
            </HStack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default PopModal;
