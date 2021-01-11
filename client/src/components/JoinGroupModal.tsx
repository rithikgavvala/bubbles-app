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
} from '@chakra-ui/react';
import axios from 'axios';

type ModalProps = {
  open: boolean;
  closeModal: () => void;
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const joinGroup = async (id: string): Promise<any> => {
  try {
    const resp = await axios.post('/bubble/join/' + id);
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
  const [code, setCode] = useState<string>('');
  const toast = useToast();

  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    try {
      await delay(500);

      await joinGroup(code);

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

  const onCodeChange = (event: React.FormEvent<HTMLInputElement>) => {
    setCode(event.currentTarget.value);
  };

  return (
    <Modal isOpen={props.open} onClose={props.closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Group Code:</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl>
              <FormLabel>Type your 5-digit group code:</FormLabel>
              <Input onChange={onCodeChange} placeholder="XXXXX" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" isLoading={loading}>
              Join
            </Button>
            <Button onClick={props.closeModal}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default JoinGroupModal;
