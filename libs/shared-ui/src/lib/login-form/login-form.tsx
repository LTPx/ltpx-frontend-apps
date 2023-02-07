import styles from './login-form.module.scss';
import {
  Button,
  ColorsButton,
  Input,
  InputTextStatus,
  StatusInputText,
  TypeButton,
} from '@ltpx-frontend-apps/shared-ui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ICredentials } from '@ltpx-frontend-apps/api';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface LoginFormProps {
  onSubmit: (data: ICredentials) => void;
}

export function LoginForm(props: LoginFormProps) {
  const { onSubmit } = props;
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Debe ser un correo electrónico válido')
        .required('Correo electrónico es obligatorio'),
      password: Yup.string().required('Contraseña es obligatorio'),
    }),
    onSubmit: (data) => {
      onSubmit(data);
    },
  });

  return (
    <form className={styles['form']}>
      <Input
        label={t('login.email') || ''}
        type="email"
        name="email"
        placeholder="myemail@example.com"
        onChange={(e: any) => {
          formik.handleChange(e);
        }}
        value={formik.values.email}
        onBlur={formik.handleBlur}
      />
      {formik.touched.email && formik.errors.email ? (
        <InputTextStatus
          status={StatusInputText.error}
          text={formik.errors.email}
        />
      ) : null}
      <Input
        label={t('login.password') || ''}
        type="password"
        name="password"
        placeholder="********"
        onChange={(e: any) => {
          formik.handleChange(e);
        }}
        value={formik.values.password}
        onBlur={formik.handleBlur}
      />
      {formik.touched.password && formik.errors.password ? (
        <InputTextStatus
          status={StatusInputText.error}
          text={formik.errors.password}
        />
      ) : null}
      <Button
        className={styles['btn-submit']}
        color={ColorsButton.primary}
        title={t('buttons.signIn')}
        full={true}
        type={TypeButton.submit}
        onClick={formik.handleSubmit}
      />
    </form>
  );
}

export default LoginForm;
