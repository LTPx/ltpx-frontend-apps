import styles from './change-password-form.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../input/input';
import Button, { ColorsButton, TypeButton } from '../button/button';
import { INewPassword } from '@ltpx-frontend-apps/api';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';

/* eslint-disable-next-line */
export interface ChangePasswordFormProps {
  onSubmit: (data: INewPassword) => void;
}

export function ChangePasswordForm(props: ChangePasswordFormProps) {
  const { onSubmit } = props;

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Contraseña actual es obligatoria'),
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
      onSubmit(data);
    },
  });

  return (
    <div className={styles['container']}>
      <form>
        <div className={styles['general']}>
          <Input
            label="Ingresa tu contraseña actual"
            name="currentPassword"
            type="password"
            placeholder="********"
            onChange={(e: any) => {
              formik.handleChange(e);
            }}
            value={formik.values.currentPassword}
            onBlur={formik.handleBlur}
          />
          {formik.touched.currentPassword && formik.errors.currentPassword ? (
            <InputTextStatus
              status={StatusInputText.error}
              text={formik.errors.currentPassword}
            />
          ) : null}
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
          />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <InputTextStatus
              status={StatusInputText.error}
              text={formik.errors.newPassword}
            />
          ) : null}
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
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <InputTextStatus
              status={StatusInputText.error}
              text={formik.errors.confirmPassword}
            />
          ) : null}
        </div>
        <div className={styles['form-submit']}>
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

export default ChangePasswordForm;
