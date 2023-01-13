import styles from './login.module.scss';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  BannerNotification,
  BannerType,
  LoginForm,
} from '@ltpx-frontend-apps/shared-ui';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ICredentials, TypeAccounts } from '@ltpx-frontend-apps/api';
import { useUser } from '../../../store';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  const [error, setError] = useState(false);
  const { login } = useUser();

  const navigate = useNavigate();

  const onSubmitForm = async(formData: ICredentials) => {
    const userAccount = {
      email: formData.email,
      password: formData.password,
    };
    const { isLogin, data } = await login(userAccount);
    if (isLogin) {
      if (data.initial_register === TypeAccounts.student) {
        navigate('/student/dashboard');
      }
      if (data.initial_register === TypeAccounts.teacher) {
        navigate('/teacher/dashboard');
      }
      window.location.reload();
    } else {
      setError(true);
    }
  }

  return (
    <div className="main-container">
      <div className={styles['container']}>
        <div className={styles['content']}>
          <h1>Iniciar Sesión</h1>
          <p>
            Accede a una comunidad de apoyo de instructores en línea. obten
            acceso instantáneo a todos nuestros cursos y clases.
          </p>
          {error && (
            <BannerNotification
              type={BannerType.error}
              onClickClose={() => setError(false)}
            >
              Tu email o password no coinciden, prueba recuperando contraseña
            </BannerNotification>
          )}
          <LoginForm onSubmit={(formData)=>{onSubmitForm(formData)}} />
          <NavLink to={'/forget-password'} className={styles['link']}>
            Olvidaste tu contraseña?
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Login;
