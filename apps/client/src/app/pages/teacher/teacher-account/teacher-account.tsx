import { IUserAccount } from '@ltpx-frontend-apps/api';
import { UserAccountForm } from '@ltpx-frontend-apps/shared-ui';
import styles from './teacher-account.module.scss';

/* eslint-disable-next-line */
export interface TeacherAccountProps {}

export function TeacherAccount(props: TeacherAccountProps) {
  return (
    <div className={styles['container']}>
     <UserAccountForm onSubmit={function (data: IUserAccount): void {
        throw new Error('Function not implemented.');
      } }/>
    </div>
  );
}

export default TeacherAccount;
