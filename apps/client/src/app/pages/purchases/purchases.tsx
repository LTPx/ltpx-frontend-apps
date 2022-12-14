import { NavLink } from 'react-router-dom';
import styles from './purchases.module.scss';

/* eslint-disable-next-line */
export interface PurchasesProps {}

export function Purchases(props: PurchasesProps) {
  return (
    <div className={`${styles['container']}`}>
      <h2>My Purchases </h2>
      <br />
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Date</th>
            <th>Payment Method</th>
            <th>Total</th>
            <th>Invoice</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Frontend Master Design</td>
            <td>3 November 2022</td>
            <td>PayPhone</td>
            <td>$39.99</td>
            <td>
              <NavLink to='/user/payments/invoice'>
                See details
              </NavLink>
            </td>
          </tr>
          <tr>
            <td>Backend Master design</td>
            <td>13 November 2022</td>
            <td>Credit Card</td>
            <td>$29.99</td>
            <td>
              <NavLink to='/user/payments/invoice'>
                See details
              </NavLink>
            </td>
          </tr>
          <tr>
            <td>UI/UX Master design</td>
            <td>13 December 2022</td>
            <td>Stripe</td>
            <td>$19.99</td>
            <td>
              <NavLink to='/user/payments/invoice'>
                See details
              </NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Purchases;
