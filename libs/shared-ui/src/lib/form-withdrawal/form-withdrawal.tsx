import { useFormik } from 'formik';
import Button, { ColorsButton, TypeButton } from '../button/button';
import Input from '../input/input';
import Select from '../select/select';
import TextArea from '../text-area/text-area';
import styles from './form-withdrawal.module.scss';
import * as Yup from 'yup';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';
import { BankAccount, WithdrawalParams } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface FormWithdrawalProps {
  banks: BankAccount[];
  balanceAvailable: number;
  onClose?: () => void;
  onSubmit: (data: WithdrawalParams) => void;
}

export function FormWithdrawal(props: FormWithdrawalProps) {
  const { onClose, onSubmit, banks, balanceAvailable } = props;

  const banksOption = banks.map((bank)=>{
    return {
      value: bank.bank_account_number,
      text: `${bank.bank_name}: ${bank.bank_account_number}`
    }
  });

  const formik = useFormik({
    initialValues: {
      bank_account_number: banks[0].bank_account_number,
      amount: 20,
      note: '',
    },
    validationSchema: Yup.object({
      bank_account_number: Yup.string().required('Se debe seleccionar el banco'),
      amount: Yup
      .number()
      .positive()
      .integer()
      .min(20, "El monto mínimo es 20 dólares")
      .max(2000, "El monto máximo es 2000 dólares")
      .test(
        "bank_account_number",
        "Monto superior al saldo disponible de retiro",
      (value) => {
          if (value ) {
            if (value > balanceAvailable) {
              return false;
            } else {
              return true;
            }
          } else {
            return true;
          }
        }
      )
    }),
    onSubmit: (data) => {
      console.log(data);
      onClose && onClose();
      onSubmit(data);
    },
  });

  return (
    <form className={styles['form-withdraw']}>
      <div className={styles['withdraw-content']}>
        <Select
          label="Seleccionar banco"
          options={banksOption}
          onChange={(e) => {
            formik.setFieldValue('bank_account_number', e.value);
          }}
        />
        {formik.touched.bank_account_number && formik.errors.bank_account_number ? (
          <InputTextStatus
            status={StatusInputText.error}
            text={formik.errors.bank_account_number}
          />
        ) : null}
        <Input
          label="Monto a retirar"
          type="number"
          name="amount"
          value={formik.values.amount}
          onBlur={formik.handleBlur}
          onChange={(e: any) => {
            formik.handleChange(e);
          }}
          errorMessage={formik.errors.amount}
        />
        <TextArea
          placeholder="Agrega comentario"
          label="Nota (Opcional)"
          value={formik.values.note}
          onChange={formik.handleChange}
          name="note"
          rows={3}
        />
      </div>
      <div className={styles['footer-withdraw']}>
        <Button
          title={'Cancelar'}
          color={ColorsButton.white}
          onClick={() => {
            onClose && onClose();
          }}
        />
        <Button
          title={'Solicitar Retiro'}
          color={ColorsButton.primary}
          onClick={formik.handleSubmit}
          type={TypeButton.submit}
        />
      </div>
    </form>
  );
}

export default FormWithdrawal;
