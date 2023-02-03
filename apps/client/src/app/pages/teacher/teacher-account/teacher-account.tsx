import { IUserAccount } from '@ltpx-frontend-apps/api';
import { BannerNotification, UserAccountForm } from '@ltpx-frontend-apps/shared-ui';
import { useTeacher } from '@ltpx-frontend-apps/store';
import { useEffect, useState } from 'react';
import styles from './teacher-account.module.scss';

/* eslint-disable-next-line */
export interface TeacherAccountProps {}

export function TeacherAccount(props: TeacherAccountProps) {
  const [showMessage, setShowMessage] = useState(false);
  const { getProfile, updateProfile, profile } = useTeacher();

  useEffect(() => {
    if (!profile) {
      getProfile();
    }
  }, []);

  const clickFunction = async(data: IUserAccount) => {
    const response = await updateProfile(data);
    if (response.success) {
      console.log(response);
      setShowMessage(true);
    } else {
      console.log(response.data);
    }
  };

  return (
    <div className={styles['container']}>
      { showMessage && (
        <BannerNotification onClickClose={()=>{setShowMessage(false)}}>
          <h4>Tus datos se han actualizado</h4>
        </BannerNotification>
      )}
      { profile && (
        <UserAccountForm onSubmit={clickFunction} data={profile} />
      )}
    </div>
  );
}

export default TeacherAccount;
