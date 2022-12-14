import styles from './payments.module.scss';

/* eslint-disable-next-line */
export interface PaymentsProps {}

export function Payments(props: PaymentsProps) {
  return (
    <div className={`${styles['container']} card`}>
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
            <td>See details</td>
          </tr>
          <tr>
            <td>Backend Master design</td>
            <td>13 November 2022</td>
            <td>Credit Card</td>
            <td>$29.99</td>
            <td>See details</td>
          </tr>
          <tr>
            <td>UI/UX Master design</td>
            <td>13 December 2022</td>
            <td>Stripe</td>
            <td>$19.99</td>
            <td>See details</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Payments;
