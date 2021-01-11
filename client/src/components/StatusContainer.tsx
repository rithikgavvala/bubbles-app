import React from 'react';
import Status from './Status';
import PopButton from './PopButton';

import {Grid, Box} from "@chakra-ui/react";


const StatusContainer: React.FC = () => {
    return (
        <Grid templateColumns="repeat(5,1fr)" >
            <Box w="100%">
                <Status />
            </Box>
            <Box w="100%">
                <PopButton />
            </Box>

        </Grid>

    );

}

export default StatusContainer;
