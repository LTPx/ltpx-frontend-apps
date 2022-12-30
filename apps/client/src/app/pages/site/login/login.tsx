import styles from './login.module.scss';
import {
  Button,
  ColorsButton,
  Input,
  TypeButton,
} from '@ltpx-frontend-apps/shared-ui';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { UserContext } from '../../../store/context/user/user-context';
import { loginUser, TypeAccounts } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(false);

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
    onSubmit: async data => {
      const userAccount = {
        email: data.email,
        password: data.password,
      }
      try{
        const { user } = await loginUser(userAccount);
        setError(false);
        localStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('isAuthenticated', 'true');
        setUser(user);
        if (user.initial_register === TypeAccounts.user) {
          navigate('/student/dashboard');
        }
        if (user.initial_register === TypeAccounts.teacher) {
          navigate('/teacher/account');
        }
        console.log('user: ', user);
      }
      catch(error: any){
        console.log('error: ', error.response);
        setError(true);
      }
    },
  });

  return (
    <div className="main-container">
      <div className={styles['container']}>
        <div className={styles['content']}>
          <h1>Iniciar Sesión</h1>
          <span>
            Accede a una comunidad de apoyo de instructores en línea. obten acceso instantáneo
            a todos nuestros cursos y clases.
          </span>
          <form onSubmit={formik.handleSubmit}>
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
