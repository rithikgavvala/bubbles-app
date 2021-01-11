import React, { useState} from 'react';
import axios from 'axios';
import {Profile, Test}  from './ParentContainer'
import { TestStatus } from '../types';

import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Select,
  useToast,
} from '@chakra-ui/react';
import moment from 'moment';


const addTest = async (data: any): Promise<any> => {
  try {
    await axios.post('/test/add', data);
  } catch (e: any) {
    if (e.response) {
      throw new Error(e.response.data.message);
    } else {
      throw new Error('CANT LEAVE SORRY FAM');
    }
  }
};

const getDateStrings = () => {
    const selectDateStrings: string[] = []
    for(let i = 7; i > 0;i-- ){
        const prevDate = moment().subtract(i, 'days')
        const prevFormatDate = prevDate.format("dddd, MMMM Do")
        selectDateStrings.push(prevFormatDate)
    }
    console.log(selectDateStrings);
    return selectDateStrings;
}


type ModalProps = {
  open: boolean;
  profile: Profile
  handleProfileChange: (profile : Profile) => void
  closeModal: () => void;
};

const AddModal: React.FC<ModalProps> = (props: ModalProps) => {
  const [userDate, setUserDate] = useState<Date>(new Date());
  const [userTestStatus, setUserTestStatus] = useState<string>("");

  const dates = getDateStrings();

  
  const onStatusChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setUserTestStatus(event.currentTarget.value);
    console.log(event.currentTarget.value);

  }
  
  const onDateChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const userSelectedDate = moment(event.currentTarget.value, "dddd, MMMM Do");
    setUserDate(userSelectedDate.toDate());
    console.log(event.currentTarget.value);

  }


  const toast = useToast();
//   const [dates, setDates] = useState<string>(false);
  const handleSaveClick = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    
    try {
      await addTest({ testDate: userDate, userTestStatus: userTestStatus});

      let tempTests: Test[] = []
      if(props.profile.tests){
        tempTests = props.profile.tests
      }

      const tempTest: Test = {date: userDate, status: userTestStatus as TestStatus}

      tempTests.push(tempTest)
      const newProfile: Profile = {
        name: props.profile.name as string,
        bubbleCode: props.profile.bubbleCode as string,
        tests: tempTests
      }

      props.handleProfileChange(newProfile);

      toast({
        title: 'Success!',
        description: 'You have added your test!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });


      props.closeModal()
      
    } catch (e) {
      console.log(e);
      toast({
        title: 'Cannot add test!',
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
        <ModalHeader>Add Test</ModalHeader>
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
              <FormLabel>Test date:</FormLabel>
              <Select placeholder="Select date" onChange={onDateChange}>
                {dates.map((date, index) => (
                    <option key={index} value={date}>{date}</option>



                ))}


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
  );
};

export default AddModal;
