import React from 'react';
import Status from './Status';
import PopButton from './PopButton';

import {HStack, Box} from "@chakra-ui/react";


const StatusContainer: React.FC = () => {
    return (
        <HStack  spacing= "">
            <Box w="75%">
                <Status />
            </Box>
            <Box 
        
            w="25%">
                <PopButton />
            </Box>

        </HStack>

    );

}

export default StatusContainer;
