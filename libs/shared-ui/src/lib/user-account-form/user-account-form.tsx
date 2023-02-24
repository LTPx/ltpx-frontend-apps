import styles from './user-account-form.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../input/input';
import Button, { ColorsButton, TypeButton } from '../button/button';
import { IUserAccount } from '@ltpx-frontend-apps/api';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';
import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */

export interface UserAccountFormProps {
  onSubmit: (data: IUserAccount) => void;
  data?: IUserAccount | null;
  url?: string;
}

export function UserAccountForm(props: UserAccountFormProps) {
  const { onSubmit, data, url} = props;
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      fullname: data?.fullname || '',
      username: data?.username || '',
      phone: data?.phone || '',
      birth: data?.birth || '',
      country: data?.country || '',
      city: data?.city || '',
      address: data?.address || '',
      email: data?.email || '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required('Nombre completo es obligatorio'),
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
          <label>{t('userAccountForm.title')}</label>
          <div className={styles['general-grid']}>
            <div className={styles['fields']}>
              <div>
                <Input
                  label={t('userAccountForm.fullName') || ''}
                  name="fullname"
                  placeholder="Carlos Huerta"
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
              </div>
              <Input
                label={t('userAccountForm.userName') || ''}
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
                  label={t('userAccountForm.email') || ''}
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
                label={t('userAccountForm.phone') || ''}
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
          <label>{t('userAccountForm.subTitle')}</label>
          <div className={styles['general-grid']}>
            <div className={styles['fields']}>
              <Input
                label={t('userAccountForm.country') || ''}
                name="country"
                placeholder="Ecuador"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.country}
                onBlur={formik.handleBlur}
              />
              <Input
                label={t('userAccountForm.city') || ''}
                name="city"
                placeholder="Guayaquil"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.city}
                onBlur={formik.handleBlur}
              />
              <Input
                label={t('userAccountForm.address') || ''}
                name="address"
                placeholder="Av Millares 29-12"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.address}
                onBlur={formik.handleBlur}
              />
              <Input
                label={t('userAccountForm.birth') || ''}
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
              color={ColorsButton.white}
              outline={true}
              title="Cancelar"
              link={url}
            />
          <Button
            color={ColorsButton.primary}
            title={t('buttons.updateData')}
            type={TypeButton.submit}
            onClick={formik.handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}

export default UserAccountForm;
