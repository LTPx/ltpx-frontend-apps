import { Avatar } from 'evergreen-ui';
import { NavLink } from 'react-router-dom';
import styles from './payments-page.module.scss';

/* eslint-disable-next-line */
export interface PaymentsPageProps {}

export function PaymentsPage(props: PaymentsPageProps) {
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
          <tr>
            <td className={styles['user-name']}>
              <Avatar name={'Ricardo Capa'} size={40}></Avatar>
              Ricardo Capa
            </td>
            <td>20$</td>
            <td>10 de Enero</td>
            <td>
              <NavLink to={`/admin/payments-details`}>Retiro</NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PaymentsPage;
