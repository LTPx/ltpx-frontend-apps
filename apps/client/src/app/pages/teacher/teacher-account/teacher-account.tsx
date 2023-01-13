import { IUserAccount } from '@ltpx-frontend-apps/api';
import { UserAccountForm } from '@ltpx-frontend-apps/shared-ui';
import styles from './teacher-account.module.scss';

/* eslint-disable-next-line */
export interface TeacherAccountProps {}

export function TeacherAccount(props: TeacherAccountProps) {
  const clickFunction = () => {
    console.log('click');
  };
  return (
    <div className={styles['container']}>
      <UserAccountForm onSubmit={clickFunction} />
    </div>
  );
}

export default TeacherAccount;
