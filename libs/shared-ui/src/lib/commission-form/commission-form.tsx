import { Dialog } from 'evergreen-ui';
import styles from './commission-form.module.scss';
import Input from '../input/input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextArea from '../text-area/text-area';
import Button, { ColorsButton, TypeButton } from '../button/button';
/* eslint-disable-next-line */
export interface CommissionFormProps {
  onSubmit: (data: any) => void;
  onClose?: () => void;
  open?: boolean;
}

export function CommissionForm(props: CommissionFormProps) {
  const { onSubmit, onClose, open } = props;

  const formik = useFormik({
    initialValues: {
      commission: 25 || '',
      comment: '',
    },
    validationSchema: Yup.object({
      commission: Yup.number()
        .required('Es obligatorio')
        .min(2, 'La comisión minima es del 2%')
        .max(25, 'La comisión maxima es del 25%'),
    }),
    onSubmit: (data) => {
      onSubmit(data);
    },
  });
  return (
    <Dialog
      isShown={open}
      hasFooter={false}
      title={'Asignar valor de comisión'}
      onCloseComplete={() => {
        onClose && onClose();
      }}
    >
      <div className={styles['commission-modal']}>
        <Input
          label={'Valor de comisión'}
          type="number"
          name="commission"
          onChange={(e: any) => {
            formik.handleChange(e);
          }}
          value={formik.values.commission}
          onBlur={formik.handleBlur}
          errorMessage={formik.errors.commission}
        />
        <TextArea
          label="Comentario"
          rows={8}
          placeholder="Envía una observación de ser necesario"
          name="comment"
          value={formik.values.comment}
          onChange={(e: any) => {
            formik.handleChange(e);
          }}
        />
        <div className={styles['footer']}>
          <Button
            title="Cancelar"
            color={ColorsButton.white}
            onClick={onClose}
          />
          <Button
            title="Guardar"
            type={TypeButton.submit}
            onClick={formik.handleSubmit}
          />
        </div>
      </div>
    </Dialog>
  );
}

export default CommissionForm;
