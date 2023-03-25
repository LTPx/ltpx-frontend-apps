import { changePassword, IUserAccount, TeacherProfileParams } from '@ltpx-frontend-apps/api';
import { useTeacher, useUtil } from '@ltpx-frontend-apps/store';
import {
  BannerNotification,
  ChangePasswordForm,
  BankAccountForm,
  Tabs,
  TeacherProfileForm,
} from '@ltpx-frontend-apps/shared-ui';
import { useEffect, useState } from 'react';
import styles from './teacher-account.module.scss';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface TeacherAccountProps {}

export function TeacherAccount(props: TeacherAccountProps) {
  const { getProfile, _updateProfile, profile } = useTeacher();
  const navigate = useNavigate();
  const { setMessageToast } = useUtil();

  useEffect(() => {
    getProfile();
  }, []);
  const [selectedTab, setSelectedTab] = useState(0);

  async function updateUserAccount(params: IUserAccount) {}

  async function updateUserPassword(params: any) {
    const data = {
      current_password: params.currentPassword,
      confirm_password: params.confirmPassword,
      password: params.newPassword
    }
    try {
      await changePassword(data)
      setMessageToast('success', 'Tu contraseña ah sido actualizada');
      navigate('/teacher/account/account-profile');

    } catch (error) {
      setMessageToast('error', 'Ha ocurrido un error');
    }
  }

  async function updateTeacherProfile(params: TeacherProfileParams) {
    const { success, data, error } = await _updateProfile(params);
    if (success) {
      setMessageToast('success', 'Tu perfil ha sido actualizado');
      navigate('/teacher/account/account-profile');
    } else {
      setMessageToast('error', error);
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
          {selectedTab === 0 && (
            <TeacherProfileForm
              profile={profile}
              onSubmit={updateTeacherProfile}
            />
          )}
          {selectedTab === 1 && (
            <BankAccountForm
              account={profile.bank_accounts[0]}
              onSubmit={updateTeacherProfile}
            />
          )}
          {selectedTab === 2 && (
            <ChangePasswordForm
              url="/teacher/account/account-profile"
              onSubmit={(params)=>{
                updateUserPassword(params);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default TeacherAccount;
