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
  const [error, setError] = useState({
    invalid: false,
    message: ''
  });
  const { loginAdmin } = useUser();
  const navigate = useNavigate();

  const onSubmitForm = async(formData: ICredentials) => {
    const userAccount = {
      email: formData.email,
      password: formData.password,
    };
    const { isLogin, data } = await loginAdmin(userAccount);
    console.log('data: ', data);
    if (isLogin) {
      navigate('/admin/dashboard');
    } else {
      setError({
        invalid: true,
        message: data.message
      });
    }
  }

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['title-head']}>
          <Brand />
          <h1>Iniciar Sesión</h1>
        </div>
        {error.invalid && (
          <BannerNotification
            type={BannerType.error}
            onClickClose={() => {
              setError({
                invalid: false,
                message: ''
              });
            }}
          >
            {error.message}
          </BannerNotification>
        )}
        <LoginForm onSubmit={onSubmitForm} />
      </div>
    </div>
  );
}

export default Login;
