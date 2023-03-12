import { WithdrawalReviewAdmin } from '@ltpx-frontend-apps/api';
import { Button, Modal } from '@ltpx-frontend-apps/shared-ui';
import { useAdmin } from '@ltpx-frontend-apps/store';
import { Avatar, Dialog } from 'evergreen-ui';
import { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PaymentsDetailsPage from '../payments-details-page/payments-details-page';
import styles from './payments-page.module.scss';

/* eslint-disable-next-line */
export interface PaymentsPageProps {}

export function PaymentsPage(props: PaymentsPageProps) {
  const { _getWithdrawalsByStatus } = useAdmin();
  const [withdrawals, setWithdrawals] = useState<WithdrawalReviewAdmin[]>([]);
  const [ openModal, setOpenModal ] = useState(false);

  const fetchData = useCallback(async () => {
    const { success, data, error } = await _getWithdrawalsByStatus('review');
    if (success) {
      console.log('data: ', data);
      setWithdrawals(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles['container']}>
      <h1>Pagos Pendientes</h1>
      <table>
        <thead>
          <tr>
            <th>Profesor</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Solicitud</th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.map((withdrawal, index) => (
            <tr key={index}>
              <td className={styles['user-name']}>
                <Avatar name={'Ricardo Capa'} size={40}></Avatar>
                {withdrawal.teacher_name}
              </td>
              <td>{withdrawal.amount_format}</td>
              <td>{withdrawal.submitted_at}</td>
              <td>
                <NavLink to={`/admin/payments-details/${withdrawal.id}`}>
                  Ver Solicitud
                </NavLink>
                {/* <Button title='Procesar Pago' outline={true}
                  onClick={()=> setOpenModal(true)}
                /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog
        isShown={openModal}
        hasFooter={false}
        title='Solicitud de Pago'
        onCloseComplete={() => setOpenModal(false)}
        width={'60vw'}
      >
        <PaymentsDetailsPage/>
      </Dialog>
    </div>
  );
}

export default PaymentsPage;
