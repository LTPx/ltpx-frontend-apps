import styles from './user-account-form.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../input/input';
import Button, { ColorsButton, TypeButton } from '../button/button';
import { IUserAccount } from '@ltpx-frontend-apps/api';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';
/* eslint-disable-next-line */

export interface UserAccountFormProps {
  onSubmit: (data: IUserAccount) => void;
}

export function UserAccountForm(props: UserAccountFormProps) {
  const { onSubmit } = props;

  const formik = useFormik({
    initialValues: {
      fullName: '',
      username: '',
      phone: '',
      birth: '',
      country: '',
      city: '',
      address: '',
      email: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Nombre completo es obligatorio'),
      email: Yup.string()
        .email('Debe ser un correo electrónico válido')
        .required('Correo electrónico es obligatorio'),
    }),
    onSubmit: (data) => {
      onSubmit(data);
    },
  });

  return (
    <div className={styles['container']}>
      <form>
        <div className={styles['general']}>
          <label>Información General</label>
          <div className={styles['general-grid']}>
            <div className={styles['fields']}>
              <div>
                <Input
                  label="Nombre completo"
                  name="fullName"
                  placeholder="Carlos Huerta"
                  onChange={(e: any) => {
                    formik.handleChange(e);
                  }}
                  value={formik.values.fullName}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                  <InputTextStatus
                    status={StatusInputText.error}
                    text={formik.errors.fullName}
                  />
                ) : null}
              </div>
              <Input
                label="Nombre de usuario"
                name="username"
                placeholder="carl"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.username}
                onBlur={formik.handleBlur}
              />
              <div>
                <Input
                  label="Correo electrónico"
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
              </div>
              <Input
                label="Teléfono"
                name="phone"
                placeholder="0999999999"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.phone}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
        </div>
        <div className={styles['general']}>
          <label>Otra Información</label>
          <div className={styles['general-grid']}>
            <div className={styles['fields']}>
              <Input
                label="País"
                name="country"
                placeholder="Ecuador"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.country}
                onBlur={formik.handleBlur}
              />
              <Input
                label="Ciudad"
                name="city"
                placeholder="Guayaquil"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.city}
                onBlur={formik.handleBlur}
              />
              <Input
                label="Dirección"
                name="address"
                placeholder="Av Millares 29-12"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.address}
                onBlur={formik.handleBlur}
              />
              <Input
                label="Fecha de Nacimiento"
                name="birth"
                placeholder="1996-12-21"
                type="date"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.birth}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
        </div>
        <div className={styles['form-submit']}>
          <Button
            color={ColorsButton.primary}
            title="Actualizar mis datos"
            type={TypeButton.submit}
            onClick={formik.handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}

export default UserAccountForm;
