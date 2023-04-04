import { IUserAccount, TeacherProfileParams } from '@ltpx-frontend-apps/api';
import { useTeacher, useUser, useUtil } from '@ltpx-frontend-apps/store';
import {
  ChangePasswordForm,
  BankAccountForm,
  Tabs,
  TeacherProfileForm,
  Button,
  ColorsButton,
  Loader,
} from '@ltpx-frontend-apps/shared-ui';
import { useEffect, useState } from 'react';
import styles from './teacher-account.module.scss';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'evergreen-ui';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface TeacherAccountProps {}

export function TeacherAccount(props: TeacherAccountProps) {
  const { getProfile, _updateProfile, profile } = useTeacher();
  const { changePassword } = useUser();
  const [formData, setFormData] = useState<TeacherProfileParams>();
  const { setMessageToast } = useUtil();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    getProfile();
  }, []);
  const [selectedTab, setSelectedTab] = useState(0);

  // async function updateUserAccount(params: IUserAccount) {}

  async function updateUserPassword(params: any) {
    const formatParams = {
      current_password: params.currentPassword,
      confirm_password: params.confirmPassword,
      password: params.newPassword,
    };
    const { success, error } = await changePassword(formatParams);
    if (success) {
      setMessageToast('success', 'Tu contraseña ah sido actualizada');
      navigate('/teacher/account/account-profile');
    } else {
      setMessageToast('error', error);
    }
  }

  async function updateTeacherProfile(params: TeacherProfileParams) {
    const { success, error } = await _updateProfile(params);
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
  const handleSubmit = async () => {
    if (formData) {
      setSaving(true);
      const { success, error } = await _updateProfile(formData);
      setSaving(false);
      setOpenConfirmationModal(false);
      if (success) {
        setMessageToast('success', 'Tu perfil ha sido actualizado');
        navigate('/teacher/account/account-profile');
      } else {
        setMessageToast('error', error);
      }
    }
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
              onSubmit={(data: TeacherProfileParams) => {
                setOpenConfirmationModal(true);
                setFormData(data);
              }}
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
              onSubmit={(params) => {
                updateUserPassword(params);
              }}
            />
          )}
        </div>
      )}
      <Dialog
        isShown={openConfirmationModal}
        title={`${
          saving ? 'Guardando...' : 'Confirmar actualización de información'
        }`}
        onCloseComplete={() => setOpenConfirmationModal(false)}
        hasFooter={false}
      >
        <div className={styles['dialog-confirm']}>
          {!saving && (
            <>
              <h4>
                {
                  'La información sera actualizada luego de cargar todos los datos '
                }
              </h4>
              <div className={styles['footer']}>
                <Button
                  title={t('buttons.cancel')}
                  color={ColorsButton.white}
                  onClick={() => {
                    setOpenConfirmationModal(false);
                  }}
                />
                <Button
                  title={'Confirmar'}
                  onClick={() => {
                    handleSubmit();
                  }}
                />
              </div>
            </>
          )}
          {saving && (
            <div className={styles['loading']}>
              <Loader />
              <h4>Estamos subiendo tus archivos...</h4>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default TeacherAccount;
