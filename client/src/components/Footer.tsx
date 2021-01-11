import React from 'react';
import AddTestButton from './AddTestButton';
import { Profile } from './ParentContainer';
import UpdateTestButton from './UpdateTestButton';
// import { TestStatus } from '../types'

type Props = {
  profile: Profile;
  handleProfileChange: (profile: Profile) => void;
};

const Footer: React.FC<Props> = (props: Props) => {
  console.log('PROFILE', props.profile);
  if (props.profile) {
    const tests = props.profile.tests;
    if (tests && tests.length > 0 && tests[tests.length - 1].status == 'INPROGRESS') {
      console.log('BUTTON');
      return <UpdateTestButton profile={props.profile} handleProfileChange={props.handleProfileChange} />;
    } else {
      return <AddTestButton profile={props.profile} handleProfileChange={props.handleProfileChange} />;
    }
  } else {
    return <> </>;
  }
};
export default Footer;
