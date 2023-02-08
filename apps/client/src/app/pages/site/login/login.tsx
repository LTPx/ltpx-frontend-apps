import styles from './login.module.scss';
import {
  BannerNotification,
  BannerType,
  LoginForm,
} from '@ltpx-frontend-apps/shared-ui';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ICredentials, TypeAccounts } from '@ltpx-frontend-apps/api';
import { useUser } from '@ltpx-frontend-apps/store';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  const [error, setError] = useState(false);
  const { login } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmitForm = async (formData: ICredentials) => {
    const userAccount = {
      email: formData.email,
      password: formData.password,
    };
    const { isLogin, data } = await login(userAccount);
    if (isLogin) {
      if (data.initial_register === TypeAccounts.user) {
        navigate('/home');
      }
      if (data.initial_register === TypeAccounts.student) {
        navigate('/student/dashboard');
        window.location.reload();
      }
      if (data.initial_register === TypeAccounts.teacher) {
        navigate('/teacher/dashboard');
        // window.location.reload();
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <h1>{t('login.title')}</h1>
        <p>{t('login.text')}</p>
        {error && (
          <BannerNotification
            type={BannerType.error}
            onClickClose={() => setError(false)}
          >
            Tu email o password no coinciden, prueba recuperando contraseña
          </BannerNotification>
        )}
        <LoginForm
          onSubmit={(formData) => {
            onSubmitForm(formData);
          }}
        />
        <NavLink to={'/forget-password'} className={styles['link']}>
          Olvidaste tu contraseña?
        </NavLink>
      </div>
    </div>
  );
}

export default Login;
