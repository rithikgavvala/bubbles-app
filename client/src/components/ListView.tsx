import React from 'react';
import { Box } from '@chakra-ui/react';
import { User } from './ParentContainer';

type Props = {
  users: User[];
  bubbleCode?: string;
};

const ListView: React.FC<Props> = (props: Props) => {
  const userRows = props.users.map((user, index) => {
    return (
      <Box
        color="black"
        paddingLeft="1.5rem"
        paddingTop="0.25rem"
        paddingBottom="0.25rem"
        borderBottom="1px solid #C4C4C4"
        key={index}
      >
        {user.name}
      </Box>
    );
  });

  return (
    <>
      <Box paddingLeft="1.5rem" fontWeight="300">
        Bubble Code: {props.bubbleCode}
      </Box>
      <Box
        borderRadius="2px"
        boxShadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
        bg="#FFFFFF"
        margin="1rem"
      >
        {userRows}
      </Box>
    </>
  );
};
export default ListView;
