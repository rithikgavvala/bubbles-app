import React, { useEffect, useState } from 'react';
import { Profile } from './ParentContainer';
// components
import { Tag, Box, Flex, Heading } from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const getCurrUser = async (): Promise<Profile> => {
  try {
    const currProfile = await axios.get('/user');
    return currProfile.data;
  } catch (e: any) {
    if (e.response) {
      throw new Error(e.response.data.message);
    } else {
      throw new Error('YOU DONT EXIST');
    }
  }
};

const Header: React.FC = () => {
  const [name, setName] = useState<string>('');

  
  useEffect(() => {
    const getProfile = async () => {
      try {
        const profile: Profile = await getCurrUser();
        if(profile.name){
          const nameArr = profile.name.split(" ")
          const initials = nameArr[0].charAt(0) + nameArr[nameArr.length - 1].charAt(0) + ""
          setName(initials as string);
          
        }

      } catch (e) {}
    };
    getProfile();
  });
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="#3182CE"
      color="white"
      height="100%"
    >
      <Flex align="center" mr={5} height="100%">
        <Link to="/">
          <Heading as="h1" letterSpacing={'-.05rem'}>
            Bubbles
          </Heading>
        </Link>
      </Flex>
      <Box display={{ base: 'block' }}>
        <Tag
        height="2rem"
        borderRadius="100%"
       >{name}</Tag>
      </Box>
    </Flex>
  );
};

export default Header;
