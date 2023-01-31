import { ICredentials, loginAdmin, TypeAccounts } from '@ltpx-frontend-apps/api';
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
    if (isLogin) {
      if (data.initial_register === TypeAccounts.admin) {
        navigate('/admin/dashboard');
      } else {
        setError({
          invalid: true,
          message: 'No tienes permisos suficientes para acceder a este sitio'
        });
      }
    } else {
      setError({
        invalid: true,
        message: 'Tu email o password no coinciden'
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
            Tu email o password no coinciden, prueba recuperando contraseña
          </BannerNotification>
        )}
        <LoginForm onSubmit={onSubmitForm} />
      </div>
    </div>
  );
}

export default Login;
