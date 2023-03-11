import { ReactElement } from 'react';
import BalanceCard from '../balance-card/balance-card';
import styles from './balance-account.module.scss';

/* eslint-disable-next-line */
export interface BalanceAccountProps {
  children?: ReactElement;
  balanceWithdrawal: string;
  balanceAvailable: string;
}

export function BalanceAccount(props: BalanceAccountProps) {
  const { children, balanceWithdrawal, balanceAvailable } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['balances-container']}>
        <div className={styles['balances-info']}>
          <h2 className={styles['balance-text']}>Mi Balance</h2>
          <div className={styles['balances']}>
            <BalanceCard
              balance={balanceAvailable}
              text="Balance Disponible"
              credit={true}
              className={styles['custom-balance-card']}
            />
            <BalanceCard
              balance={balanceWithdrawal}
              text="Pendiente"
              credit={false}
              className={styles['custom-balance-card']}
            />
          </div>
        </div>
        <div className="withdrawal">
          {children}
        </div>
      </div>
    </div>
  );
}

export default BalanceAccount;
