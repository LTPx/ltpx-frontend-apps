import { useFormik } from 'formik';
import styles from './payment-form.module.scss';
import * as Yup from 'yup';
import Input from '../input/input';
import Button, { ColorsButton, TypeButton } from '../button/button';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';

/* eslint-disable-next-line */
export interface PaymentFormProps {
  onSubmit: (params: any) => void;
}

export function PaymentForm(props: PaymentFormProps) {
  const { onSubmit } = props;
  const formik = useFormik({
    initialValues: {
      bank_name: '',
      bank_account_number: '',
      bank_account_type: '',
      national_id: '',
      address: '',
      phone_number: '',
      owner_account_name: '',
    },
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
      phone_number: Yup.string().required('teléfono es obligatorio'),
      owner_account_name: Yup.string().required(
        'Propietario de la cuenta es obligatorio'
      ),
    }),
    onSubmit: (data) => {
      // console.log(data)
      onSubmit({
        bank_accounts: [data],
      });
    },
  });

  return (
    <div className={styles['container']}>
      <form className={styles['form']}>
        <div className={styles['general']}>
          <label>Cuenta Bancaria</label>
          <p className={styles['describe']}>Asegúrate que los datos estén correctos para recibir tus pagos sin problemas</p>
          <div className={styles['bank-information']}>
            <div>
              <Input
                label="Nombre del Banco"
                type="text"
                name="bank_name"
                placeholder="Ingresar nombre del Banco correspondiente"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.bank_name}
                onBlur={formik.handleBlur}
              />
              {formik.touched.bank_name && formik.errors.bank_name ? (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={formik.errors.bank_name}
                />
              ) : null}
            </div>
            <div>
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
              />
              {formik.touched.owner_account_name &&
              formik.errors.owner_account_name ? (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={formik.errors.owner_account_name}
                />
              ) : null}
            </div>
            <div>
              <Input
                label="Número de identificación"
                type="text"
                name="national_id"
                placeholder="Ingresar su número de identificación "
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.national_id}
                onBlur={formik.handleBlur}
              />
              {formik.touched.national_id && formik.errors.national_id ? (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={formik.errors.national_id}
                />
              ) : null}
            </div>
            <div>
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
              />
              {formik.touched.bank_account_number &&
              formik.errors.bank_account_number ? (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={formik.errors.bank_account_number}
                />
              ) : null}
            </div>
            <div>
              <Input
                label="Tipo de cuenta"
                type="text"
                name="bank_account_type"
                placeholder="Ingresar tipo de cuenta"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.bank_account_type}
                onBlur={formik.handleBlur}
              />
              {formik.touched.bank_account_type &&
              formik.errors.bank_account_type ? (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={formik.errors.bank_account_type}
                />
              ) : null}
            </div>
            <div>
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
              />
              {formik.touched.address && formik.errors.address ? (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={formik.errors.address}
                />
              ) : null}
            </div>
            <div>
              <Input
                label="Teléfono"
                type="text"
                name="phone_number"
                placeholder="0987654321"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.phone_number}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone_number && formik.errors.phone_number ? (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={formik.errors.phone_number}
                />
              ) : null}
            </div>
          </div>
          <div className={styles['btn-submit']}>
            <Button
              color={ColorsButton.white}
              outline={true}
              title="Cancelar"
              link={'/teacher/account/account-profile'}
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

export default PaymentForm;
