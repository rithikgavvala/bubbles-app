import React from 'react';
import Status from './Status';
import PopButton from './PopButton';
import { Profile } from './ParentContainer';
import { HStack, Box } from '@chakra-ui/react';

type Props = {
  user: Profile;
};

const StatusContainer: React.FC<Props> = (props: Props) => {
  return (
    <HStack spacing="">
      <Box w="75%">
        <Status user={props.user} />
      </Box>
      <Box w="25%">
        <PopButton />
      </Box>
    </HStack>
  );
};

export default StatusContainer;
