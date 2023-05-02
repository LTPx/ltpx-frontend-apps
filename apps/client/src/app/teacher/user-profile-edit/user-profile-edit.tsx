import { UserAccountForm } from '@ltpx-frontend-apps/shared-ui';
import styles from './user-profile-edit.module.scss';
import { IUserAccount } from '@ltpx-frontend-apps/api';
import { useUser, useUtil } from '@ltpx-frontend-apps/store';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface UserProfileEditProps {}

export function UserProfileEdit(props: UserProfileEditProps) {
  const { user, _updateAccount } = useUser();
  const { setMessageToast } = useUtil();
  const navigate = useNavigate();

  const updateProfileUser = async (params: IUserAccount) => {
    const { success, error, data } = await _updateAccount(params);
    if (success) {
      setMessageToast('success', 'Tu perfil ha sido actualizado');
      navigate('/teacher/account/account-user');
    } else {
      setMessageToast('error', error);
    }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['title-content']}>
        <h4 className={styles['title']}>Editar Perfil de Usuario</h4>
      </div>
      <UserAccountForm
        onSubmit={(data) => {
          updateProfileUser(data);
        }}
        user={user}
        url={'/teacher/account/account-user'}
      />
    </div>
  );
}

export default UserProfileEdit;
