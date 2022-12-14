import { Outlet } from 'react-router-dom';
import styles from './payments-layout.module.scss';

/* eslint-disable-next-line */
export interface PaymentsLayoutProps {}

export function PaymentsLayout(props: PaymentsLayoutProps) {
  return (
    <div className={`${styles['container']} card`}>
      <Outlet />
    </div>
  );
}

export default PaymentsLayout;
