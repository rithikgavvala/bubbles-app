import React from 'react';
import Header from './Header';
import Status from './Status';
import { Box } from '@chakra-ui/react';


const ParentContainer: React.FC = () => {
    return(
        <>
            <Box minH="100%">

                <Header />
                <Status />
            </Box>
        </>
        
        
    );


}

export default ParentContainer;