/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Tabs, Tab, Box, TabPanels, TabPanel, TabList } from '@chakra-ui/react';
import { User, Test } from './ParentContainer';
import { getStatusFromTests } from '../utils/getStatusFromDate';
import { UserStatus } from '../types';

type Props = {
  users: User[];
  bubbleCode?: string;
};

const ListView: React.FC<Props> = (props: Props) => {
  const pending: any = [];
  const positive: any = [];
  const untested: any = [];
  const good: any = [];

  const listItem = (name: string) => {
    return (
      <Box
        color="black"
        paddingLeft="1.5rem"
        paddingTop="0.25rem"
        paddingBottom="0.25rem"
        borderBottom="1px solid #C4C4C4"
      >
        {name}
      </Box>
    );
  };
  props.users.forEach((user) => {
    const status = getStatusFromTests(user.tests as Test[]);
    if (status == UserStatus.GOOD) {
      good.push(listItem(user.name as string));
    } else if (status == UserStatus.UNTESTED) {
      untested.push(listItem(user.name as string));
    } else if (status == UserStatus.PENDING) {
      pending.push(listItem(user.name as string));
    } else if (status == UserStatus.POSITIVE) {
      positive.push(listItem(user.name as string));
    }
  });

  return (
    <>
      <Box paddingLeft="1.5rem" fontWeight="300">
        Bubble Code: {props.bubbleCode}
      </Box>
      <Box
        borderRadius="2px"
        // boxShadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
        bg="#FFFFFF"
        margin="1rem"
      >
        <Tabs>
          <TabList>
            <Tab>Good</Tab>
            <Tab>Pending</Tab>
            <Tab>Untested</Tab>
            <Tab>Positive</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{good}</TabPanel>
            <TabPanel>{pending}</TabPanel>
            <TabPanel>{untested}</TabPanel>
            <TabPanel>{positive}</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};
export default ListView;
