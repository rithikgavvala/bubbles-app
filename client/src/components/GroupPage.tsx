import React, { useState } from 'react';
import JoinGroupModal from './JoinGroupModal';
import CreateGroupModal from './CreateGroupModal';
import { Flex, Heading, Button, Box } from '@chakra-ui/react';

const ParentContainer: React.FC = () => {
  const [isJoinGroupOpen, setJoinGroup] = useState<boolean>(false);
  const [isCreateGroupOpen, setCreateGroup] = useState<boolean>(false);

  const onOpenJoinGroup = () => {
    setJoinGroup(true);
  };

  const onOpenCreateGroup = () => {
    setCreateGroup(true);
  };
  return (
    <>
      <Box minH="100%">
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
        <Flex padding="1.5rem">
          <Button bg="#3182CE" color="white" size="lg" onClick={onOpenJoinGroup}>
            Join Group
          </Button>
          <JoinGroupModal open={isJoinGroupOpen} closeModal={() => setJoinGroup(false)} />
        </Flex>
        <Flex padding="1.5rem">
          <Button bg="#3182CE" color="white" size="lg" onClick={onOpenCreateGroup}>
            Create Group
          </Button>
          <CreateGroupModal open={isCreateGroupOpen} closeModal={() => setCreateGroup(false)}/>
        </Flex>
      </Box>
    </>
  );
};

export default ParentContainer;
