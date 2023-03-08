import { useFormik } from 'formik';
import Button, { ColorsButton } from '../button/button';
import Input from '../input/input';
import Select from '../select/select';
import TextArea from '../text-area/text-area';
import styles from './form-withdrawal.module.scss';
import * as Yup from 'yup';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';

/* eslint-disable-next-line */
export interface FormWithdrawalProps {
  onClose?: () => void;
}

export function FormWithdrawal(props: FormWithdrawalProps) {
  const { onClose } = props;
  const formik = useFormik({
    initialValues: {
      name_bank: '',
      withdrawal_amount: 0,
      comment: '',
    },
    validationSchema: Yup.object({
      name_bank: Yup.string().required('Se debe seleccionar el banco'),
      withdrawal_amount: Yup
      .number()
      .positive()
      .integer()
      .min(20, "El monto mínimo es 20 dólares")
      .max(2000, "El monto máximo es 2000 dólares")

    }),
    onSubmit: (data) => {
      console.log(data);
      onClose && onClose();
    },
  });

  const sortByOptions = [
    { value: 'pichincha', text: 'Pichincha' },
    { value: 'loja', text: 'Loja' },
    { value: 'guayaquil', text: 'Guayaquil' },
  ];

  return (
    <form className={styles['form-withdraw']}>
      <div className={styles['withdraw-content']}>
        <Select
          label="Seleccionar banco"
          options={sortByOptions}
          onChange={(e) => {
            formik.setFieldValue('name_bank', e.value);
          }}
        />
        {formik.touched.name_bank && formik.errors.name_bank ? (
          <InputTextStatus
            status={StatusInputText.error}
            text={formik.errors.name_bank}
          />
        ) : null}
        <Input
          label="Monto a retirar"
          type="number"
          name="withdrawal_amount"
          value={formik.values.withdrawal_amount}
          onBlur={formik.handleBlur}
          onChange={(e: any) => {
            formik.handleChange(e);
          }}
          errorMessage={formik.errors.withdrawal_amount}
        />
        <TextArea
          placeholder="Agrega comentario"
          label="Comentario (Opcional)"
          value={formik.values.comment}
          onChange={formik.handleChange}
          name="comment"
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
        />
      </div>
    </form>
  );
}

export default FormWithdrawal;
