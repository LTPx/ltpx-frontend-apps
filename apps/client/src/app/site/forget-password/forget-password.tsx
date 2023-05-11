import {
  BannerNotification,
  BannerType,
  Button,
  Input,
} from '@ltpx-frontend-apps/shared-ui';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './forget-password.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUser } from '@ltpx-frontend-apps/store';
import { useState } from 'react';

export function ForgetPassword() {
  const { _resetPassword } = useUser();
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Debe ser un correo electrónico válido')
        .required('Correo electrónico es obligatorio'),
    }),
    onSubmit: async (form) => {
      const { success, error, data } = await _resetPassword(form.email);
      if (success) {
        localStorage.setItem('reset_account', form.email);
        navigate('/login');
      } else {
        setError(error);
      }
    },
  });
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <h1>Olvidaste tu contraseña?</h1>
        <h4>
          No te preocupes, te enviaremos las instrucciones a tu correo
          electrónico
        </h4>
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
        <div className={styles['email']}>
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Ingresa tu correo electrónico"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={(e: any) => {
              formik.handleChange(e);
            }}
            errorMessage={formik.errors.email}
          />
        </div>
        <Button
          title={'Restablecer la contraseña'}
          full={true}
          onClick={formik.handleSubmit}
        />
        <NavLink to={'/login'} className={styles['link']}>
          Regresar a Iniciar Sesión
        </NavLink>
      </div>
    </div>
  );
}
