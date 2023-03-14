import {
  Button,
  ColorsButton,
  ColorsTag,
  FilesUploaded,
  Icon,
  Input,
  Tag,
  TypeFile,
  useMoment,
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
  const { formatDate } = useMoment()
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
      receipt_image: Yup.mixed()
        .required('Se debe subir el comprobante de deposito')
        .test(
          'national_id_front',
          'El archivo debe ser menor o igual a 1mb',
          (value) => {
            if (value) {
              const fileSize = value.size;
              const fileMb = fileSize / 1024 ** 2;
              return fileMb <= 1;
            } else {
              return false;
            }
          }
        ),
    }),
    onSubmit: async (formData) => {
      const { success, data, error } = await _approveWithdrawal(
        withdrawalId,
        formData
      );
      if (success) {
        console.log('data: ', data);
      } else {
        console.log('error: ', error);
      }
    },
  });

  const tags = {
    approved: {
      text: 'Aprobada',
      color: ColorsTag.green,
    },
    rejected: {
      text: 'Aprobada',
      color: ColorsTag.red,
    },
    review: {
      text: 'Pendiente',
      color: ColorsTag.orange,
    },
  };

  return (
    <div className={styles['container']}>
      <div className={`${styles['withdrawal-card']} ${styles['details']}`}>
        <div className={styles['title']}>
          <h2>Solicitud de Retiro</h2>
          {withdrawal?.status && (
            <Tag
              text={tags[withdrawal.status].text}
              color={tags[withdrawal.status].color}
            />
          )}
        </div>
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
      {withdrawal?.status === 'review' && (
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
                type={TypeFile.image}
                onChange={(value) => {
                  formik.setFieldValue('receipt_image', value);
                }}
                errorMessage={formik.errors.receipt_image}
              />
            </div>
            <Button
              title={'Guardar'}
              color={ColorsButton.primary}
              onClick={formik.handleSubmit}
              full={true}
            />
          </div>
        </div>
      )}
      {withdrawal?.status === 'approved' && withdrawal?.receipt_id && (
        <div className={`${styles['withdrawal-card']} ${styles['approved-section']}`}>
          <h2 className={styles['title']}>Comprobante</h2>
          <div className={styles['section']}>
            <h4 className={styles['label']}>Fecha de aprobación</h4>
            <p className={styles['text']}>{formatDate(withdrawal?.approved_at)}</p>
          </div>
          <div className={styles['section']}>
            <h4 className={styles['label']}>Numero de transacción</h4>
            <pre className={styles['text']}>{withdrawal?.receipt_id}</pre>
          </div>
          <div className={styles['section']}>
            <h4 className={styles['label']}>Image</h4>
            <img
              className={styles['image']}
              src={withdrawal?.receipt_image}
              alt="receipt-image"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentsDetailsPage;
