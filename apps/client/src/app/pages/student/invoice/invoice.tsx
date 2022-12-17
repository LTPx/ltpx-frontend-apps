import { Button, ColorsButton, Icon } from '@ltpx-frontend-apps/shared-ui';
import { NavLink } from 'react-router-dom';
import styles from './invoice.module.scss';

/* eslint-disable-next-line */
export interface InvoiceProps {}

export function Invoice(props: InvoiceProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['print']}>
        <h2>
          <NavLink to={'/student/payments/purchases'}>
            <Icon icon='chevron-left' size={18}/>
          </NavLink> Invoice: #48484
        </h2>
        <Button title='Print' color={ColorsButton.primary} />
      </div>
      <div className={styles['invoice']}>
        <div className={styles['header']}>
          <div className={styles['brand']}>LTPX</div>
          <div className={styles['invoice-number']}>Invoice# 48484</div>
        </div>
        <div className={styles['dates']}>
          <div className={styles['date']}>
            <label htmlFor="date">Invoice Date</label>
            <h5>03/10/2022</h5>
          </div>
          <div className={`${styles['date']} ${styles['text-right']}`}>
            <label htmlFor="date">Due Date</label>
            <h5>03/10/2022</h5>
          </div>
        </div>
        <div className={styles['customer']}>
          <div className={styles['info']}>
            <h3>Supplier</h3>
            <label htmlFor="date">Ltpx LLC</label>
            <h5>2301 Ravenswood, Madrid - Spain</h5>
          </div>
          <div className={`${styles['info']} ${styles['text-right']}`}>
            <h3>Customer</h3>
            <label htmlFor="date">Michael Wood</label>
            <h5>Cdl Tebaida, Loja - Ecuador</h5>
          </div>
        </div>
        <div className={styles['table-details']}>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Frontend Master Design</td>
                <td>3 November 2022</td>
                <td>1</td>
                <td>$39.99</td>
              </tr>
              <tr>
                <td>Backend Master design</td>
                <td>13 November 2022</td>
                <td>1</td>
                <td>$29.99</td>
              </tr>
              <tr>
                <td>UI/UX Master design</td>
                <td>13 December 2022</td>
                <td>1</td>
                <td>$19.99</td>
              </tr>
              <tr className={styles['total-row']}>
                <td colSpan={3}><h3>Total</h3></td>
                <td><h3>$89.97</h3></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
