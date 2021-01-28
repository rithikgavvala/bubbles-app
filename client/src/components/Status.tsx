import React from 'react';
import { Profile, Test, Bubble } from './ParentContainer';
import { getStatusFromTests } from '../utils/getStatusFromDate';
import { UserStatus } from '../types';
import BubblesMenu from './BubblesMenu';
// components
import { Flex, Tag, TagLabel, VStack, Text } from '@chakra-ui/react';

type Props = {
  bubbles: Bubble[];
  bubbleName: string;
  user: Profile;
};

type Status = {
  color?: string;
  message?: string;
  feedback?: string;
};

const mapStatusToTag = (status: UserStatus): Status => {
  if (status == UserStatus.GOOD) {
    return {
      color: '#C1FFB7',
      message: 'Clear',
      feedback: "You are good to go!",
    };
  }
  if (status == UserStatus.POSITIVE) {
    return {
      color: '#FF6A6A',
      message: 'Positive',
      feedback: 'Get well soon',
    };
  }
  if (status == UserStatus.PENDING) {
    return {
      color: '#F6E05E',
      message: 'Pending',
      feedback: 'Update your test result',
    };
  }

  return {
    color: '#D9D9D9',
    message: 'Untested',
    feedback: 'Please get tested soon',
  };
};

const Status: React.FC<Props> = (props: Props) => {
  console.log("STATUS PROPS", props.user);
  console.log("STATUS PROPS TESTS", props.user.tests);

  const status = mapStatusToTag(getStatusFromTests(props.user.tests as Test[]));

  return (
    <Flex as="nav" justify="space-between" wrap="wrap" padding="1.5rem" bg="white" color="black" height="100%">
      <VStack spacing={4} align="left">
    
        <BubblesMenu bubbles={props.bubbles} bubbleName={props.bubbleName} />
        <div>
          My Status:         <Tag color="black" align="center" w={'6em'} size={'md'} borderRadius="full" variant="solid" bg={status.color} alignItems="center">
          <TagLabel marginLeft="auto" marginRight="auto" align="center">{status.message}</TagLabel>
        </Tag>

        </div>

        <Text> {status.feedback} </Text>
      </VStack>
    </Flex>
  );
};

export default Status;
