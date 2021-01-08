import React from 'react';
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
} from '@chakra-ui/react';

type ModalProps = {
  open: boolean;
  closeModal: () => void;
};

const JoinGroupModal: React.FC<ModalProps> = (props: ModalProps) => {
  return (
    <Modal isOpen={props.open} onClose={props.closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Group Code:</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Type your 4-digit group code:</FormLabel>
            <Input placeholder="XXXX" />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button>Join</Button>
          <Button>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JoinGroupModal;
