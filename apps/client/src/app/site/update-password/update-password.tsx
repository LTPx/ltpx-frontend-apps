import {
  Button,
  ColorsButton,
  Input,
  TypeButton,
} from '@ltpx-frontend-apps/shared-ui';
import styles from './update-password.module.scss';
import * as Yup from 'yup';
import { useFormik } from 'formik';

/* eslint-disable-next-line */
export interface UpdatePasswordProps {}

export function UpdatePassword(props: UpdatePasswordProps) {
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required('Nueva contraseña es requerida'),
      confirmPassword: Yup.string().test(
        'Las contraseñas coinciden',
        'Tu nueva contraseña no coincide',
        function (value) {
          return this.parent.newPassword === value;
        }
      ),
    }),
    onSubmit: (data) => {
      console.log(data);
    },
  });
  return (
    <div className={styles['container']}>
      <h1>Cambiar Contraseña</h1>
      <form className={styles['form-update-password']}>
        <div className={styles['general']}>
          <Input
            label="Nueva contraseña"
            name="newPassword"
            type="password"
            placeholder="********"
            onChange={(e: any) => {
              formik.handleChange(e);
            }}
            value={formik.values.newPassword}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.newPassword}
          />
          <Input
            label="Confirmar nueva contraseña"
            name="confirmPassword"
            type="password"
            placeholder="********"
            onChange={(e: any) => {
              formik.handleChange(e);
            }}
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.confirmPassword}
          />
        </div>
        <div className={styles['btn-submit']}>
          <Button
            color={ColorsButton.primary}
            title="Cambiar contraseña"
            type={TypeButton.submit}
            onClick={formik.handleSubmit}
            full={true}
          />
        </div>
      </form>
    </div>
  );
}

export default UpdatePassword;
