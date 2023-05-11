import { Button, Input } from '@ltpx-frontend-apps/shared-ui';
import { NavLink } from 'react-router-dom';
import styles from './forget-password.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUser } from '@ltpx-frontend-apps/store';

export function ForgetPassword() {
  const { _resetPassword } = useUser();
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
      const { success, error, data } =  await _resetPassword(form.email);
      if (success) {
        //redirect to login
        console.log(data);
      } else {
        //mostrar error
        console.log(error);
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

export default ForgetPassword;
