import styles from './account.module.scss';
import { UserAccountForm } from '@ltpx-frontend-apps/shared-ui';
import { IUserAccount } from '@ltpx-frontend-apps/api';
import { useUser } from '@ltpx-frontend-apps/store';
import { useNavigate } from 'react-router-dom';

export function Account() {
  const { user, _updateAccount } = useUser();
  const navigate = useNavigate();

  const onSubmit = async(params: IUserAccount) => {
    const { success, error, data} =  await _updateAccount(params);
    if (success) {
      console.log(data);
      navigate('/student/account');
    } else {
      console.log(error);
    }
  };

  return (
    <div className={`${styles['container']} card`}>
      <div className={styles['title-content']}>
        <h4 className={styles['title']}>Editar Cuenta de Usuario</h4>
      </div>
      <UserAccountForm
        url="/student/account"
        user={user}
        onSubmit={(data) => {
          onSubmit(data);
        }}
      ></UserAccountForm>
    </div>
  );
}

export default Account;
