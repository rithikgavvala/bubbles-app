import { Test } from '../components/ParentContainer';
import { TestStatus, UserStatus } from '../types';
import moment from 'moment';

/*
- NEGATIVE: Negative Test within 2 days of current date
- POSITIVE: Positive Test within 2 days of current date
- PENDING: In progress test within 2 days of current date
- UNTESTED

*/
const getStatusFromTests = (tests: Test[]): UserStatus => {
  console.log("STATISTICS", tests);

  const now = moment();
  if (!tests || tests.length == 0) {
    return UserStatus.UNTESTED;
  }
  //   const diff = now.diff(testDate, 'days');
  console.log('biii', tests[tests.length - 1].status);
  if (tests[tests.length - 1].status == TestStatus.POSITIVE) {
    console.log('possitive ass biitch');
    return UserStatus.POSITIVE;
  }

  if (tests[tests.length - 1].status == TestStatus.INPROGRESS) {
    return UserStatus.PENDING;
  }

  for (let i = tests.length - 1; i > 0; i--) {
    if (now.diff(tests[i].date, 'days') <= 2) {
      if (tests[i].status == TestStatus.NEGATIVE) {
        return UserStatus.GOOD;
      }
    }
  }
  return UserStatus.UNTESTED;
};

export { getStatusFromTests };
