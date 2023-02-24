import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './purchases.module.scss';

/* eslint-disable-next-line */
export interface PurchasesProps {}

export function Purchases(props: PurchasesProps) {
  const { _getStudentPayments, purchases } = useStudent();

  const fetchPayments = useCallback(async () => {
    const { success, data, error } = await _getStudentPayments();
    if (success) {
      console.log('data: ', data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return (
    <div className={`${styles['container']}`}>
      <h2>Mis compras </h2>
      <br />
      <table>
        <thead>
          <tr>
            <th>Curso</th>
            <th>Fecha de compra</th>
            <th>Método de pago</th>
            <th>Total</th>
            <th>Factura</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase, index) => (
            <tr key={index}>
              <td>{purchase.description}</td>
              <td>{purchase.purchase_date}</td>
              <td>{purchase.payment_gateway}</td>
              <td>{purchase.amount_format}</td>
              <td>
                <NavLink to="/student/payments/invoice">See details</NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Purchases;
