import { IUserAccount } from '@ltpx-frontend-apps/api';
import { UserAccountForm } from '@ltpx-frontend-apps/shared-ui';
import { useEffect } from 'react';
import { useTeacher } from '../../../store';
import styles from './teacher-account.module.scss';

/* eslint-disable-next-line */
export interface TeacherAccountProps {}

export function TeacherAccount(props: TeacherAccountProps) {
  const { getProfile, updateProfile, profile } = useTeacher();

  useEffect(() => {
    if (!profile) {
      getProfile();
    }
  }, []);

  const clickFunction = async(data: IUserAccount) => {
    console.log('data: ', data);
    const response = await updateProfile(data);
    if (response.saved) {
      console.log(response);
    } else {
      console.log(response.data);
    }
  };

  return (
    <div className={styles['container']}>
      { profile && (
        <UserAccountForm onSubmit={clickFunction} data={profile} />
      )}
    </div>
  );
}

export default TeacherAccount;
