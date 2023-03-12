import { WithdrawalReviewAdmin } from '@ltpx-frontend-apps/api';
import { Tabs } from '@ltpx-frontend-apps/shared-ui';
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
  const [ selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [withdrawals, setWithdrawals] = useState<WithdrawalReviewAdmin[]>([]);
  const tabs = [{ text: 'Pendientes' }, { text: 'Aprobados' }];

  const fetchData = useCallback(async (index: number) => {
    const status = index === 0 ? 'review' : 'approved';
    const { success, data, error } = await _getWithdrawalsByStatus(status);
    if (success) {
      console.log('data: ', data);
      setWithdrawals(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchData(selectedTabIndex);
  }, [selectedTabIndex]);

  return (
    <div className={styles['container']}>
      <h1>Pagos</h1>
      <Tabs
        tabs={tabs}
        onClickTab={(index) => {
          setSelectedTabIndex(index);
        }}
      />
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
                <Avatar name={withdrawal.teacher_name} size={40}></Avatar>
                {withdrawal.teacher_name}
              </td>
              <td>{withdrawal.amount_format}</td>
              <td>{withdrawal.submitted_at}</td>
              <td>
                <NavLink to={`/admin/payments-details/${withdrawal.id}`}>
                  Ver Solicitud
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentsPage;
