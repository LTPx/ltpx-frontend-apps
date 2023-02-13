import { IUserAccount } from '@ltpx-frontend-apps/api';
import { useTeacher } from '@ltpx-frontend-apps/store';
import {
  BannerNotification,
  PaymentForm,
  Tabs,
  TeacherProfileForm,
  UserAccountForm,
} from '@ltpx-frontend-apps/shared-ui';
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
  const [selectedTab, setSelectedTab] = useState(0);

  const updateUserAccount = async (data: IUserAccount) => {
    const response = await updateProfile(data);
    if (response.success) {
      console.log(response);
      setShowMessage(true);
    } else {
      console.log(response.data);
    }
  };
  const tabs = [
    {
      text: 'Perfil de Profesor',
    },
    {
      text: 'Cuenta de Usuario',
    },
    {
      text: 'Pagos',
    },
  ];
  const handleClick = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <div className={styles['container']}>
      {showMessage && (
        <BannerNotification
          onClickClose={() => {
            setShowMessage(false);
          }}
        >
          <h4>Tus datos se han actualizado</h4>
        </BannerNotification>
      )}
      {profile && (
        <div>
          <Tabs
            className={styles['tabs']}
            tabs={tabs}
            onClickTab={(option) => handleClick(option)}
          />
          {selectedTab === 0 && <TeacherProfileForm />}
          {selectedTab === 1 && (
            <UserAccountForm onSubmit={updateUserAccount} data={profile} />
          )}
          {selectedTab === 2 && <PaymentForm />}
        </div>
      )}
    </div>
  );
}

export default TeacherAccount;
