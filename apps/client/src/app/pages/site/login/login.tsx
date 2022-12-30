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
import { useContext } from 'react';
import { UserContext } from '../../../store/context/user/user-context';
import { UserRoles } from '../../../store/interfaces/user';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  const { setUser } = useContext(UserContext);

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
    onSubmit: async (data) => {
      const user = {
        email: data.email,
        name: 'Guest',
        role: UserRoles.student,
      };
      localStorage.setItem('user', JSON.stringify(user));
      try {
        navigate('/student/dashboard');
        setUser(user);
        //TODO: integrate API
      } catch (error) {
        console.log(error);
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
