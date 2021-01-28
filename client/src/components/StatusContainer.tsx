import React from 'react';
import Status from './Status';
import PopButton from './PopButton';
import { Profile, Bubble } from './ParentContainer';
import { HStack, Box } from '@chakra-ui/react';

type Props = {
  bubbles: Bubble[]
  bubbleName: string;
  user: Profile;
};

const StatusContainer: React.FC<Props> = (props: Props) => {
  return (
    <HStack spacing="">
      <Box w="75%">
        <Status bubbles={props.bubbles} bubbleName={props.bubbleName} user={props.user} />
      </Box>
      <Box w="25%">
        <PopButton />
      </Box>
    </HStack>
  );
};

export default StatusContainer;
