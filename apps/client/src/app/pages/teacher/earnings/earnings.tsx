import styles from './earnings.module.scss';

/* eslint-disable-next-line */
export interface EarningsProps {}

export function Earnings(props: EarningsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Earnings!</h1>
    </div>
  );
}

export default Earnings;
