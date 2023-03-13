import { IUserAccount, TeacherProfileParams } from '@ltpx-frontend-apps/api';
import { useTeacher } from '@ltpx-frontend-apps/store';
import {
  BannerNotification,
  ChangePasswordForm,
  PaymentForm,
  Tabs,
  TeacherProfileForm,
} from '@ltpx-frontend-apps/shared-ui';
import { useEffect, useState } from 'react';
import styles from './teacher-account.module.scss';

/* eslint-disable-next-line */
export interface TeacherAccountProps {}

export function TeacherAccount(props: TeacherAccountProps) {
  const [showMessage, setShowMessage] = useState(false);
  const { getProfile, _updateProfile, profile } = useTeacher();

  useEffect(() => {
    if (!profile) {
      getProfile();
    }
  }, []);
  const [selectedTab, setSelectedTab] = useState(0);

  async function updateUserAccount(params: IUserAccount) {

  }

  async function updateTeacherProfile(params: TeacherProfileParams) {
    const { success, data, error} = await _updateProfile(params);
    if (success) {
      setShowMessage(true);
      console.log('data: ', data);
    } else {
      console.log('error: ', error);
    }
  }

  const tabs = [
    {
      text: 'Perfil de Profesor',
    },
    {
      text: 'Cuenta Bancaria',
    },
    {
      text: 'Cambiar Contraseña',
    },
  ];
  const handleClick = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <div className={styles['container']}>
      {profile && (
        <div>
          <Tabs
            className={styles['tabs']}
            tabs={tabs}
            onClickTab={(option) => handleClick(option)}
          />
          {selectedTab === 0 && <TeacherProfileForm onSubmit={updateTeacherProfile}/>}
          {selectedTab === 1 && <PaymentForm onSubmit={updateTeacherProfile}/>}
          {selectedTab === 2 && (
            <ChangePasswordForm url="/teacher/account/account-profile" />
          )}
        </div>
      )}
    </div>
  );
}

export default TeacherAccount;
