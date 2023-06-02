import { ICredentials } from '@ltpx-frontend-apps/api';
import {
  BannerNotification,
  BannerType,
  Brand,
  LoginForm,
} from '@ltpx-frontend-apps/shared-ui';
import { useUser } from '@ltpx-frontend-apps/store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.scss';

export function Login() {
  const [error, setError] = useState<string>();
  const { loginAdmin } = useUser();
  const navigate = useNavigate();

  const onSubmitForm = async(formData: ICredentials) => {
    const userAccount = {
      email: formData.email,
      password: formData.password,
    };
    const { success, error } = await loginAdmin(userAccount);
    if (success) {
      navigate('/admin/dashboard');
      window.location.reload();
    } else {
      if (error === "Signature has expired") {
        setError('Tu sesión ha caducado por favor vuelve a intentar');
        localStorage.clear();
        window.location.reload();
      } else {
        setError(error);
      }
    }
  }

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['title-head']}>
          <Brand />
          <h1>Iniciar Sesión</h1>
        </div>
        {error && (
          <BannerNotification
            type={BannerType.error}
            onClickClose={() => {
              setError(undefined);
            }}
          >
            {error}
          </BannerNotification>
        )}
        <LoginForm onSubmit={onSubmitForm} />
      </div>
    </div>
  );
}

export default Login;
