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
import { useCallback, useEffect, useState } from 'react';
import { useAdmin } from '@ltpx-frontend-apps/store';
import { useParams } from 'react-router-dom';
import { WithdrawalReviewAdmin } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface PaymentsDetailsPageProps {}

export function PaymentsDetailsPage(props: PaymentsDetailsPageProps) {
  const { _getWithdrawal } = useAdmin();
  const [ withdrawal, setWithdrawal] = useState<WithdrawalReviewAdmin>()
  const { id } = useParams();
  const withdrawalId = parseInt(id || '');

  const fetchWithdrawal = useCallback(async () => {
    const { success, data, error } = await _getWithdrawal(withdrawalId);
    if (success) {
      console.log('data: ', data);
      setWithdrawal(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchWithdrawal();
  }, []);

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
          <h4 className={styles['text']}>{withdrawal?.teacher_name}</h4>
        </div>
        <div className={styles['information']}>
          <h4>Cantidad:</h4>
          <h4 className={styles['text']}>{withdrawal?.amount_format}</h4>
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
              <h4 className={styles['text']}>{withdrawal?.teacher_bank_account.bank_name}</h4>
            </div>
            <div className={styles['item']}>
              <h4>Propietario de la cuenta: </h4>
              <h4 className={styles['text']}>{withdrawal?.teacher_bank_account.owner_account_name}</h4>
            </div>
          </div>
          <div className={styles['row']}>
            <div className={styles['item']}>
              <h4>Número de cuenta: </h4>
              <h4 className={styles['text']}>{withdrawal?.teacher_bank_account.bank_account_number}</h4>
            </div>
            <div className={styles['item']}>
              <h4>Tipo de cuenta: </h4>
              <h4 className={styles['text']}>{withdrawal?.teacher_bank_account.type_account}</h4>
            </div>
          </div>
          <div className={styles['row']}>
            <div className={styles['item']}>
              <h4>Número de identificación: </h4>
              <h4 className={styles['text']}>{withdrawal?.teacher_bank_account.national_id}</h4>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['payment-content']}>
        <h3 className={styles['title-payment']}>Comprobante</h3>
        <Input
          label="Numero de comprobante"
          type="text"
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
