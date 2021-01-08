import React from 'react';
import Header from './Header';
import { Flex, Heading, Button, Box } from '@chakra-ui/react';


const ParentContainer: React.FC = () => {
    return(
        <>
            <Box minH="100%">
                <Header />
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
                        You have not joined a group yet. 
                    </Heading>
                    </Flex>
                   
                </Flex>
                <Flex
                    padding="1.5rem"

                >
                        <Button bg="#3182CE" color="white" size="lg" >
                        Join Group
                    </Button>

                </Flex>
                <Flex
                    padding="1.5rem"
                >


                <Button bg="#3182CE" color="white" size="lg">
                                        Create Group
                                    </Button>

                </Flex>
          
                

            </Box>
        </>
        
        
    );


}

export default ParentContainer;