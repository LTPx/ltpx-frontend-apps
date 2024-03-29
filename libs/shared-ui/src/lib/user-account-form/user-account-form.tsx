import styles from './user-account-form.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../input/input';
import Button, { ColorsButton, TypeButton } from '../button/button';
import { IUserAccount, UserStore } from '@ltpx-frontend-apps/api';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';
import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */

export interface UserAccountFormProps {
  onSubmit: (user: IUserAccount) => void;
  user: IUserAccount;
  url?: string;
}

export function UserAccountForm(props: UserAccountFormProps) {
  const { onSubmit, user, url } = props;
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      fullname: user?.fullname || '',
      username: user?.username || '',
      phone: user?.phone || '',
      birth: user?.birth || '',
      country: user?.country || '',
      city: user?.city || '',
      address: user?.address || '',
      email: user?.email || '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required('Nombre completo es obligatorio'),
      email: Yup.string()
        .email('Debe ser un correo electrónico válido')
        .required('Correo electrónico es obligatorio'),
    }),
    onSubmit: (user) => {
      onSubmit(user);
    },
  });

  return (
    <div className={styles['container']}>
      <form>
        <div className={styles['general']}>
          <div className={styles['general-grid']}>
            <div className={styles['fields']}>
              <div>
                <Input
                  label={t('userAccountForm.fullName') || ''}
                  name="fullname"
                  placeholder="Nombre Completo"
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
          <h4>{t('userAccountForm.subTitle')}</h4>
          <hr />
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
              {/* <Input
                label={t('userAccountForm.birth') || ''}
                name="birth"
                placeholder="1996-12-21"
                type="date"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.birth}
                onBlur={formik.handleBlur}
              /> */}
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
