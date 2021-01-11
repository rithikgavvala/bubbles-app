import React, { useState } from 'react';
import axios from 'axios';
import {Profile}  from './ParentContainer'

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
    Select,
    useToast,
  } from '@chakra-ui/react';

type ModalProps = {
    open: boolean;
    closeModal: () => void;
    profile: Profile
    handleProfileChange: (profile : Profile) => void
  };
  

 


const updateTest = async (status: string): Promise<any> => {
try {
    await axios.get('/test/update/'+status);
} catch (e: any) {
    if (e.response) {
    throw new Error(e.response.data.message);
    } else {
    throw new Error('CANT LEAVE SORRY FAM');
    }
}
};

const UpdateTestModal: React.FC<ModalProps> = (props: ModalProps) => {
    const toast = useToast();
    


    const [userTestStatus, setUserTestStatus] = useState<string>("");


    const onStatusChange = (event: React.FormEvent<HTMLSelectElement>) => {
        setUserTestStatus(event.currentTarget.value);
        console.log(event.currentTarget.value);
    
    }

    const handleSaveClick = async (event: React.SyntheticEvent) => {
        event.preventDefault();
    
        
        try {
          const userTestsUpdated = await updateTest(userTestStatus);

          const newProfile: Profile = {
              name: props.profile.name,
              bubbleCode: props.profile.bubbleCode,
              tests: userTestsUpdated
          };

          props.handleProfileChange(newProfile)
          
          toast({
            title: 'Success!',
            description: 'You have updated your test!',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
    
          
          props.closeModal()
          
        } catch (e) {
          console.log(e);
          toast({
            title: 'Cannot update test!',
            description: String(e),
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      };


    return(
        <Modal isOpen={props.open} onClose={props.closeModal}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Test</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSaveClick}>
                <ModalBody>
                    <FormControl>
                    <FormLabel>Result:</FormLabel>
                    <Select paddingBottom= "1rem" placeholder="Select result" onChange={onStatusChange}>
                        <option value="NEGATIVE">Negative</option>
                        <option value="INPROGRESS">In-progress</option>
                        <option value="POSITIVE">Positive</option>
                        <option value="INCONCLUSIVE">Inconclusive</option>


                    </Select>                    
                    </FormControl>
                </ModalBody>
                <ModalFooter>
        
                    <Button onClick={props.closeModal}>Cancel</Button>
                    <Button type="submit" bg="tomato">
                    Save
                    </Button>
                </ModalFooter>
                </form>
            </ModalContent>
            </Modal>
    )
}

export default UpdateTestModal;