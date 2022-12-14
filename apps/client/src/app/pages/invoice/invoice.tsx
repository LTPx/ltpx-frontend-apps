import styles from './invoice.module.scss';

/* eslint-disable-next-line */
export interface InvoiceProps {}

export function Invoice(props: InvoiceProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Invoice!</h1>
    </div>
  );
}

export default Invoice;
