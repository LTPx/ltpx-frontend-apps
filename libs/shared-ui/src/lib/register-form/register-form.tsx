import styles from './register-form.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../input/input';
import Button, { ColorsButton, TypeButton } from '../button/button';
import { IRegisterUser } from '@ltpx-frontend-apps/api';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface RegisterFormProps {
  onSubmit: (data: IRegisterUser) => void;
  termsAndConditions?: {
    link: string;
    text: string;
  }
}

export function RegisterForm(props: RegisterFormProps) {
  const { onSubmit, termsAndConditions } = props;
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required('Nombre es obligatorio'),
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
        label={t('registerForm.name') || ''}
        type="text"
        name="fullname"
        placeholder="John Doe"
        onChange={(e: any) => {
          formik.handleChange(e);
        }}
        value={formik.values.fullname}
        onBlur={formik.handleBlur}
      />
      {formik.touched.fullname && formik.errors.fullname ? (
        <InputTextStatus
          status={StatusInputText.error}
          text={formik.errors.fullname}
        />
      ) : null}
      <Input
        label={t('registerForm.email') || ''}
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
        label={t('registerForm.password') || ''}
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
      { termsAndConditions && (
          <div className={styles['terms-conditions']}>
          <input type="checkbox" id="accept" value="second_checkbox" />
          <NavLink to={termsAndConditions.link} target={'blank'}>
            <p>{termsAndConditions.text}</p>
          </NavLink>
        </div>
      )}
      <Button
        className={styles['btn-submit']}
        color={ColorsButton.primary}
        title={t('buttons.register')}
        full={true}
        type={TypeButton.submit}
        onClick={formik.handleSubmit}
      />
    </form>
  );
}

export default RegisterForm;
