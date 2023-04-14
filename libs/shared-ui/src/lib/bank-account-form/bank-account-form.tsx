import { useFormik } from 'formik';
import styles from './bank-account-form.module.scss';
import * as Yup from 'yup';
import Input from '../input/input';
import Button, { ColorsButton, TypeButton } from '../button/button';
import { BankAccount } from '@ltpx-frontend-apps/api';
import Select from '../select/select';

/* eslint-disable-next-line */
export interface BankAccountFormProps {
  onSubmit: (params: any) => void;
  account?: BankAccount;
}

export function BankAccountForm(props: BankAccountFormProps) {
  const { onSubmit, account } = props;
  const formik = useFormik({
    initialValues: {
      bank_name: account?.bank_name || '',
      bank_account_number: account?.bank_account_number || '',
      bank_account_type: account?.bank_account_type || 'saving',
      national_id: account?.national_id || '',
      address: account?.address || '',
      phone: account?.phone || '',
      owner_account_name: account?.owner_account_name || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      bank_name: Yup.string().required('Nombre del Banco es obligatorio'),
      bank_account_number: Yup.string().required(
        'Número de cuenta es obligatorio'
      ),
      bank_account_type: Yup.string().required('Tipo de cuenta es obligatorio'),
      national_id: Yup.string().required(
        'Número de identificación es obligatorio'
      ),
      address: Yup.string().required('La dirección es obligatorio'),
      phone: Yup.string().required('teléfono es obligatorio'),
      owner_account_name: Yup.string().required(
        'Propietario de la cuenta es obligatorio'
      ),
    }),
    onSubmit: (data) => {
      onSubmit({
        bank_accounts: [data],
      });
    },
  });

  return (
    <div className={styles['container']}>
      <form className={styles['form']}>
        <div className={styles['general']}>
          <p className={styles['describe']}>
            Asegúrate que los datos estén correctos para recibir tus pagos sin
            problemas
          </p>
          <div className={styles['bank-information']}>
            <Input
              label="Nombre del Banco"
              type="text"
              name="bank_name"
              placeholder="Ejm: Banco Pichincha"
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.bank_name}
              onBlur={formik.handleBlur}
              errorMessage={formik.errors.bank_name}
            />
            <Input
              label="Propietario de la cuenta"
              type="text"
              name="owner_account_name"
              placeholder="Nombre del Propietario"
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.owner_account_name}
              onBlur={formik.handleBlur}
              errorMessage={formik.errors.owner_account_name}
            />
            <Input
              label="Número de identificación"
              type="text"
              name="national_id"
              placeholder="Ejm: 1120393939"
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.national_id}
              onBlur={formik.handleBlur}
              errorMessage={formik.errors.national_id}
            />
            <Input
              label="Número de cuenta"
              type="number"
              name="bank_account_number"
              placeholder="Ingresar número de cuenta"
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.bank_account_number}
              onBlur={formik.handleBlur}
              errorMessage={formik.errors.bank_account_number}
            />
            <div className={styles['select']}>
              <Select
                label="Tipo de cuenta"
                options={[
                  { text: 'Ahorros', value: 'saving' },
                  { text: 'Crédito', value: 'credit' },
                ]}
                selected={formik.values.bank_account_type}
                onChange={(option) =>
                  formik.setFieldValue('bank_account_type', option.value)
                }
                errorMessage={formik.errors.bank_account_type}
              />
            </div>
            <Input
              label="Dirección"
              type="text"
              name="address"
              placeholder="Dirección de domicilio"
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.address}
              onBlur={formik.handleBlur}
              errorMessage={formik.errors.address}
            />
            <Input
              label="Teléfono"
              type="text"
              name="phone"
              placeholder=""
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              errorMessage={formik.errors.phone}
            />
          </div>
          <div className={styles['btn-submit']}>
            <Button
              color={ColorsButton.white}
              outline={true}
              title="Cancelar"
              link={'/teacher/account/account-bank'}
            />
            <Button
              color={ColorsButton.primary}
              title="Guardar"
              type={TypeButton.submit}
              onClick={formik.handleSubmit}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default BankAccountForm;
