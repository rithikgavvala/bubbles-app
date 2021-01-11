import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast,
  HStack,
} from '@chakra-ui/react';
import axios from 'axios';

type ModalProps = {
  open: boolean;
  closeModal: () => void;
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const createGroup = async (bubbleName: string): Promise<any> => {
  try {
    const resp = await axios.post('/bubble/create', { name: bubbleName });
    return resp.data;
  } catch (e: any) {
    if (e.response) {
      throw new Error(e.response.data.message);
    } else {
      throw new Error('Cannot add to group!');
    }
  }
};

const JoinGroupModal: React.FC<ModalProps> = (props: ModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const toast = useToast();

  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    try {
      await delay(500);

      await createGroup(name);

      props.closeModal();
      toast({
        title: 'Joined!',
        description: 'You have joined the group!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e);
      toast({
        title: 'Group does not exist!',
        description: String(e),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    history.push('/');
    setLoading(false);
  };

  const onNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  return (
    <Modal isOpen={props.open} onClose={props.closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Group Name:</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl>
              <FormLabel>Type your group name:</FormLabel>
              <Input onChange={onNameChange} placeholder="i.e. Beyblades: Let it rip" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <HStack spacing="1em">
              <Button type="submit" isLoading={loading}>
                Create
              </Button>
              <Button onClick={props.closeModal}>Nard</Button>
            </HStack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default JoinGroupModal;
