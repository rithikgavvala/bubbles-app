import React, { useEffect, useState } from 'react';
import StatusContainer from './StatusContainer';
import { TestStatus } from '../types';
import ListView from './ListView';
import Footer from './Footer';
import { Box } from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export type Test = {
  date: Date;
  status: TestStatus;
};

export type Bubble = {
  code: string;
  name: string;
};

export type User = {
  name?: string;
  tests?: Test[];
};

export type Profile = User & {
  bubbles?: Bubble[];
  bubbleName?: string;
  bubbleCode?: string;
};

const getUsers = async (): Promise<any> => {
  try {
    const users = await axios.get('/api/bubble');

    return users.data;
  } catch (e: any) {
    if (e.response) {
      throw new Error(e.response.data.message);
    } else {
      throw new Error('NAH NO USERS FAM');
    }
  }
};

const getCurrUser = async (): Promise<Profile> => {
  try {
    const currProfile = await axios.get('/user');
    console.log('CURPROF', currProfile.data);
    return currProfile.data;
  } catch (e: any) {
    if (e.response) {
      throw new Error(e.response.data.message);
    } else {
      throw new Error('YOU DONT EXIST');
    }
  }
};

const ParentContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [profile, setProfile] = useState<Profile>({});
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();

  const handleProfileChange = (profile: Profile) => {
    console.log('PROP', profile);
    setProfile(profile);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      console.log('TEST', fetchedUsers);
      setUsers(fetchedUsers.data);
    };

    const fetchProfile = async () => {
      const fetchedProfile = await getCurrUser();
      if (!fetchedProfile.bubbleCode) {
        return false;
      }
      setProfile(fetchedProfile);
      return true;
    };

    const fetchAllData = async () => {
      try {
        const profile = await fetchProfile();
        if (!profile) {
          history.push('/join');
        } else {
          await fetchUsers();
        }
      } catch (e) {
        history.push('/join');
      }

      setLoading(false);
    };
    fetchAllData();
  }, []);

  console.log('USERS', users);

  return !loading ? (
    <>
      <Box minH="100%">
        {console.log(users)}
        <StatusContainer
          bubbles={profile.bubbles as Bubble[]}
          user={profile}
          bubbleName={profile ? (profile.bubbleName as string) : 'Group not found'}
        />
        <ListView users={users} bubbleCode={profile ? profile.bubbleCode : 'NA'} />
      </Box>
      <Footer profile={profile} handleProfileChange={handleProfileChange} />
    </>
  ) : (
    <>
      <StatusContainer
        bubbles={profile.bubbles as Bubble[]}
        bubbleName={profile ? (profile.bubbleName as string) : 'Group not found'}
        user={profile}
      />
      <Box paddingLeft="1.5rem" fontWeight="300">
        Currently loading data...
      </Box>
    </>
  );
};

export default ParentContainer;
