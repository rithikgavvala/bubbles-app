import React from 'react';
import { Profile, Test } from './ParentContainer';
import { getStatusFromTests } from '../utils/getStatusFromDate';
import { UserStatus } from '../types';
// components
import { Flex, Heading, Tag, TagLabel, VStack, Text } from '@chakra-ui/react';

type Props = {
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
      color: '#68D391',
      message: 'Good',
      feedback: "you're good to go baby!",
    };
  }
  if (status == UserStatus.POSITIVE) {
    return {
      color: '#E53E3E',
      message: 'Positive',
      feedback: 'get well soon sick ass boi',
    };
  }
  if (status == UserStatus.PENDING) {
    return {
      color: '#F6E05E',
      message: 'Pending',
      feedback: 'Cross ur fingers bruh',
    };
  }

  return {
    color: '#FC8181',
    message: 'Untested',
    feedback: 'bitch get yo ass tested rn',
  };
};

const Header: React.FC<Props> = (props: Props) => {
  console.log(props.user);

  const status = mapStatusToTag(getStatusFromTests(props.user.tests as Test[]));

  return (
    <Flex as="nav" justify="space-between" wrap="wrap" padding="1.5rem" bg="white" color="black" height="100%">
      <VStack spacing={4} align="left">
        <Heading as="h1" letterSpacing={'-.05rem'}>
          Status
        </Heading>
        <Tag w={'6em'} size={'md'} borderRadius="full" variant="solid" bg={status.color} alignItems="center">
          <TagLabel>{status.message}</TagLabel>
        </Tag>
        <Text> {status.feedback} </Text>
      </VStack>
    </Flex>
  );
};

export default Header;
