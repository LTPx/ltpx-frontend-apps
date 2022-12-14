import styles from './login.module.scss';
import {
  BannerNotification,
  BannerType,
  Button,
  ColorsButton,
  Input,
  TypeButton,
} from '@ltpx-frontend-apps/shared-ui';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { TypeAccounts } from '@ltpx-frontend-apps/api';
import { useUser } from '../../../store';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  const [ error, setError] = useState(false);
  const { login } = useUser();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async formData => {
      const userAccount = {
        email: formData.email,
        password: formData.password,
      }

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
    },
  });

  return (
    <div className="main-container">
      <div className={styles['container']}>
        <div className={styles['content']}>
          <h1>Iniciar Sesión</h1>
          <p>
            Accede a una comunidad de apoyo de instructores en línea. obten acceso instantáneo
            a todos nuestros cursos y clases.
          </p>
          { error && (
            <BannerNotification type={BannerType.error} onClickClose={()=>(setError(false))}>
              Tu email o password no coinciden, prueba recuperando contraseña
            </BannerNotification>
          )}
          <form>
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="myemail@example.com"
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="********"
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            <Button
              className={styles['btn-submit']}
              color={ColorsButton.primary}
              title="Iniciar"
              full={true}
              type={TypeButton.submit}
              onClick={formik.handleSubmit}
            />
          </form>
          <NavLink to={'/forget-password'} className={styles['link']}>
            Olvidaste tu contraseña?
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Login;
