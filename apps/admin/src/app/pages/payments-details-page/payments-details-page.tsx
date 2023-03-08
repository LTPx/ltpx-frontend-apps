import {
  Button,
  ColorsButton,
  FilesUploaded,
  Icon,
  Input,
  TypeFile,
} from '@ltpx-frontend-apps/shared-ui';
import { useFormik } from 'formik';
import styles from './payments-details-page.module.scss';
import * as Yup from 'yup';

/* eslint-disable-next-line */
export interface PaymentsDetailsPageProps {}

export function PaymentsDetailsPage(props: PaymentsDetailsPageProps) {
  const formik = useFormik({
    initialValues: {
      id_receipt: '',
      file_receipt: null,
    },
    validationSchema: Yup.object({
      id_receipt: Yup.string().required(
        'Se debe ingresar numero de comprobante'
      ),
    }),
    onSubmit: (data) => {
      console.log(data);
    },
  });
  return (
    <div className={styles['container']}>
      <h2 className={styles['title-teacher']}>Solicitud de Retiro</h2>
      <div className={styles['information-teacher']}>
        <div className={styles['information']}>
          <h4>Profesor:</h4>
          <h4 className={styles['text']}>Angel Capa</h4>
        </div>
        <div className={styles['information']}>
          <h4>Cantidad:</h4>
          <h4 className={styles['text']}>20$:</h4>
        </div>
      </div>
      <div className={styles['bank']}>
        <div className={styles['title']}>
          <Icon icon={'bank'} size={20}></Icon>
          <h3>Cuenta Bancaria</h3>
        </div>
        <div className={styles['info-bank']}>
          <div className={styles['row']}>
            <div className={styles['item']}>
              <h4>Nombre del Banco: </h4>
              <h4 className={styles['text']}>Banco Pichincha</h4>
            </div>
            <div className={styles['item']}>
              <h4>Propietario de la cuenta: </h4>
              <h4 className={styles['text']}>Angel Capa</h4>
            </div>
          </div>
          <div className={styles['row']}>
            <div className={styles['item']}>
              <h4>Número de cuenta: </h4>
              <h4 className={styles['text']}>21170809654</h4>
            </div>
            <div className={styles['item']}>
              <h4>Tipo de cuenta: </h4>
              <h4 className={styles['text']}>Cuenta de Ahorros</h4>
            </div>
          </div>
          <div className={styles['row']}>
            <div className={styles['item']}>
              <h4>Número de identificación: </h4>
              <h4 className={styles['text']}>1150869368</h4>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['payment-content']}>
        <h3 className={styles['title-payment']}>Comprobante</h3>
        <Input
          label="id del Comprobante"
          type="number"
          name="id_receipt"
          value={formik.values.id_receipt}
          onBlur={formik.handleBlur}
          onChange={(e: any) => {
            formik.handleChange(e);
          }}
          errorMessage={formik.errors.id_receipt}
        />
        <div className={styles['upload']}>
          <label className={styles['title-upload']}>
            Comprobante de Deposito (.jpg, .png)
          </label>
          <FilesUploaded
            className={styles['file']}
            type={TypeFile.pdf}
            onChange={(value) => {
              formik.setFieldValue('file_receipt', value);
            }}
          />
        </div>
      </div>
      <div className={styles['footer-approved']}>
        <Button title={'Cancelar'} color={ColorsButton.white} />
        <Button
          title={'Aprobar Retiro'}
          color={ColorsButton.primary}
          onClick={formik.handleSubmit}
        />
      </div>
    </div>
  );
}

export default PaymentsDetailsPage;
