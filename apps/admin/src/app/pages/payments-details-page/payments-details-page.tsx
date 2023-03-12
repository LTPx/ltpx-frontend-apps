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
  const { _getWithdrawal, _approveWithdrawal } = useAdmin();
  const [withdrawal, setWithdrawal] = useState<WithdrawalReviewAdmin>();
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
      receipt_id: '',
      receipt_image: '',
    },
    validationSchema: Yup.object({
      receipt_id: Yup.string().required(
        'Se debe ingresar numero de comprobante'
      ),
    }),
    onSubmit: async(formData) => {
      const { success, data, error} = await _approveWithdrawal(withdrawalId, formData);
      if (success) {
        console.log('data: ', data);
      } else {
        console.log('error: ', error);
      }
    },
  });

  return (
    <div className={styles['container']}>
      <div className={`${styles['withdrawal-card']} ${styles['details']}`}>
        <h2 className={styles['title']}>Solicitud de Retiro</h2>
        <div className={styles['information-teacher']}>
          <div className={styles['information']}>
            <h4 className={styles['label']}>Profesor:</h4>
            <h4 className={styles['text']}>{withdrawal?.teacher_name}</h4>
          </div>
          <div className={styles['information']}>
            <h4 className={styles['label']}>Cantidad:</h4>
            <h4 className={styles['amount']}>{withdrawal?.amount_format}</h4>
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
                <h4 className={styles['text']}>
                  {withdrawal?.teacher_bank_account.bank_name}
                </h4>
              </div>
              <div className={styles['item']}>
                <h4>Propietario de la cuenta: </h4>
                <h4 className={styles['text']}>
                  {withdrawal?.teacher_bank_account.owner_account_name}
                </h4>
              </div>
            </div>
            <div className={styles['row']}>
              <div className={styles['item']}>
                <h4>Número de cuenta: </h4>
                <h4 className={styles['text']}>
                  {withdrawal?.teacher_bank_account.bank_account_number}
                </h4>
              </div>
              <div className={styles['item']}>
                <h4>Tipo de cuenta: </h4>
                <h4 className={styles['text']}>
                  {withdrawal?.teacher_bank_account.bank_account_type}
                </h4>
              </div>
            </div>
            <div className={styles['row']}>
              <div className={styles['item']}>
                <h4>Número de identificación: </h4>
                <h4 className={styles['text']}>
                  {withdrawal?.teacher_bank_account.national_id}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className={styles['note']}>
          <h4 className={styles['label']}>Nota del profesor:</h4>
          <pre className={styles['text']}>{withdrawal?.note}</pre>
        </div>
      </div>
      <div className={`${styles['withdrawal-card']} ${styles['form']}`}>
        <div className={styles['payment-content']}>
          <h2 className={styles['title']}>Registrar pago</h2>
          <Input
            label="Numero de comprobante"
            type="text"
            name="receipt_id"
            value={formik.values.receipt_id}
            onBlur={formik.handleBlur}
            onChange={(e: any) => {
              formik.handleChange(e);
            }}
            errorMessage={formik.errors.receipt_id}
          />
          <div className={styles['upload']}>
            <label className={styles['title-upload']}>
              Comprobante de deposito (.jpg, .png)
            </label>
            <FilesUploaded
              className={styles['file']}
              type={TypeFile.pdf}
              onChange={(value) => {
                formik.setFieldValue('receipt_image', value);
              }}
            />
          </div>
          <Button
            title={'Guardar'}
            color={ColorsButton.primary}
            onClick={formik.handleSubmit}
            full={true}
          />
        </div>
        {/* <div className={styles['payment-unapproved']}>
          <Button
            title={'Rechazar'}
            outline={true}
            color={ColorsButton.primary}
            onClick={formik.handleSubmit}
            full={true}
          />
        </div> */}
      </div>
    </div>
  );
}

export default PaymentsDetailsPage;
