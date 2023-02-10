import { useFormik } from 'formik';
import styles from './payment-form.module.scss';
import * as Yup from 'yup';
import Input from '../input/input';
import Button, { ColorsButton, TypeButton } from '../button/button';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';

/* eslint-disable-next-line */
export interface PaymentFormProps {}

export function PaymentForm(props: PaymentFormProps) {
  const formik = useFormik({
    initialValues: {
      bankName: '',
      bankAccountNumber: '',
      bankAccountType: '',
      identification_id: '',
      email: '',
      bankAccountOwner: '',
    },
    validationSchema: Yup.object({
      bankName: Yup.string().required('Nombre del Banco es obligatorio'),
      bankAccountNumber: Yup.string().required(
        'Número de cuenta es obligatorio'
      ),
      bankAccountType: Yup.string().required('Tipo de cuenta es obligatorio'),
      identification_id: Yup.string().required(
        'Número de identificación es obligatorio'
      ),
      email: Yup.string()
        .email('Debe ser un correo electrónico válido')
        .required('Correo electrónico es obligatorio'),
      bankAccountOwner: Yup.string().required(
        'Propietario de la cuenta es obligatorio'
      ),
    }),
    onSubmit: (data) => {
      console.log(data);
    },
  });

  return (
    <div className={styles['container']}>
      <form>
        <div className={styles['general']}>
        <label>Cuenta Bancaria</label>
          <div className={styles['bank-information']}>
            <div>
              <Input
                label="Nombre del Banco"
                type="text"
                name="bankName"
                placeholder="Ingresar nombre del Banco correspondiente"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.bankName}
                onBlur={formik.handleBlur}
              />
              {formik.touched.bankName && formik.errors.bankName ? (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={formik.errors.bankName}
                />
              ) : null}
            </div>
            <div>
              <Input
                label="Propietario de la cuenta"
                type="text"
                name="bankAccountOwner"
                placeholder="Nombre del Propietario"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.bankAccountOwner}
                onBlur={formik.handleBlur}
              />
              {formik.touched.bankAccountOwner &&
              formik.errors.bankAccountOwner ? (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={formik.errors.bankAccountOwner}
                />
              ) : null}
            </div>
            <div>
              <Input
                label="Número de identificación"
                type="text"
                name="identification_id"
                placeholder="Ingresar su número de identificación "
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.identification_id}
                onBlur={formik.handleBlur}
              />
              {formik.touched.identification_id &&
              formik.errors.identification_id ? (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={formik.errors.identification_id}
                />
              ) : null}
            </div>
            <div>
              <Input
                label="Número de cuenta"
                type="number"
                name="bankAccountNumber"
                placeholder="Ingresar número de cuenta"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.bankAccountNumber}
                onBlur={formik.handleBlur}
              />
              {formik.touched.bankAccountNumber &&
              formik.errors.bankAccountNumber ? (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={formik.errors.bankAccountNumber}
                />
              ) : null}
            </div>
            <div>
              <Input
                label="Tipo de cuenta"
                type="text"
                name="bankAccountType"
                placeholder="Ingresar tipo de cuenta"
                onChange={(e: any) => {
                  formik.handleChange(e);
                }}
                value={formik.values.bankAccountType}
                onBlur={formik.handleBlur}
              />
              {formik.touched.bankAccountType &&
              formik.errors.bankAccountType ? (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={formik.errors.bankAccountType}
                />
              ) : null}
            </div>
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
          </div>
          <div className={styles['btn-submit']}>
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
