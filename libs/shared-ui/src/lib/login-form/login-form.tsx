import styles from './login-form.module.scss';
import {
  BannerNotification,
  BannerType,
  Brand,
  Button,
  ColorsButton,
  Input,
  InputTextStatus,
  StatusInputText,
  TypeButton,
} from '@ltpx-frontend-apps/shared-ui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { ICredentials } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface LoginFormProps {
  onSubmit: (data: ICredentials) => void;
}

export function LoginForm(props: LoginFormProps) {
  const { onSubmit } = props;
  const [error, setError] = useState(false);

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
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['head']}>
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
          {formik.touched.email && formik.errors.email ? (
            <InputTextStatus
              status={StatusInputText.error}
              text={formik.errors.email}
            />
          ) : null}
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
          {formik.touched.password && formik.errors.password ? (
            <InputTextStatus
              status={StatusInputText.error}
              text={formik.errors.password}
            />
          ) : null}
          <Button
            className={styles['btn-submit']}
            color={ColorsButton.primary}
            title="Iniciar"
            full={true}
            type={TypeButton.submit}
            onClick={formik.handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
