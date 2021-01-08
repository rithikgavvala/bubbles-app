import React from 'react';

// components
import { Flex, Heading} from '@chakra-ui/react';

const Header: React.FC = () => {
   
  

  
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="white"
        color="black"
        height="100%"
      >
        <Flex align="center" mr={5} height="100%">
          <Heading as="h1" letterSpacing={'-.05rem'}>
            Status
          </Heading>
        </Flex>
      </Flex>
    );
  };
  
  export default Header;