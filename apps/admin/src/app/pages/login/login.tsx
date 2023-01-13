import {
  BannerNotification,
  BannerType,
  Brand,
  LoginForm,
} from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import styles from './login.module.scss';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  const [error, setError] = useState(false);
  const clickFunction = () => {
    console.log('click');
  };

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
            onClickClose={() => setError(false)}
          >
            Tu email o password no coinciden, prueba recuperando contraseña
          </BannerNotification>
        )}
        <LoginForm onSubmit={clickFunction} />
      </div>
    </div>
  );
}

export default Login;
