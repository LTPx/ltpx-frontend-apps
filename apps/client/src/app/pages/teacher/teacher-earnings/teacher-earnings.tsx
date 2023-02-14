import {
  BalanceCard,
  TransactionRow,
  TransactionStatus,
  TransactionType,
} from '@ltpx-frontend-apps/shared-ui';
import { useTeacher } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect } from 'react';
import styles from './teacher-earnings.module.scss';

export function TeacherEarnings() {
  const { _getWallet, wallet } = useTeacher();

  const fetchWallet = useCallback(async () => {
    const { success, data, error } = await _getWallet();
    if (success) {
      console.log('error: ', data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  const balance = [
    {
      mount: '$ 1.45',
      text: 'Saldo disponible',
      link: '',
    },
    {
      mount: '$ 5.0',
      text: 'Pago pendiente',
      link: '',
    },
  ];

  const transaction = [
    {
      transaction: TransactionType.payment,
      date: '7 de Sep, 2014',
      balance: '$ 20.3',
      state: TransactionStatus.completed,
      descriptionTransaction: 'por logros',
    },
    {
      transaction: TransactionType.withdrawal,
      date: '8 de Sep, 2014',
      balance: '$ 20.3',
      state: TransactionStatus.in_progress,
      descriptionTransaction: 'por servicios',
    },
    {
      transaction: TransactionType.withdrawal,
      date: '10 de Sep, 2014',
      balance: '$ 20.3',
      state: TransactionStatus.pending,
      descriptionTransaction: 'por servicios',
    },
    {
      transaction: TransactionType.payment,
      date: '7 de Sep, 2014',
      balance: '$ 20.3',
      state: TransactionStatus.rejected,
      descriptionTransaction: 'por logros',
    },
  ];

  return (
    <div className={styles['container']}>
      <div className={styles['cards-balance']}>
        { wallet.id && (
          <BalanceCard
            balance={wallet.total_earnings}
            text={'Total de ventas'}
            link={'/'}
          />
        )}
        {balance.map((element, index) => (
          <BalanceCard
            balance={element.mount}
            key={index}
            text={element.text}
            link={element.link}
          />
        ))}
      </div>
      <h2 className={styles['title']}>Ultimas Transacciones</h2>
      <div className={styles['content-earning']}>
        <div className={styles['transaction-content']}>
          {transaction.map((element, index) => (
            <TransactionRow
              key={index}
              date={element.date}
              balance={element.balance}
              status={element.state}
              descriptionTransaction={element.descriptionTransaction}
              transaction={element.transaction}
            />
          ))}
        </div>
      </div>
      {/* <div className="card">
        { wallet.id && (
          <>
            <h4>Total de ventas: {wallet.total_earnings}</h4>
            <h4>Saldo disponible para retirar: {wallet.balance_available_withdraw}</h4>
          </>
        )}
      </div> */}
    </div>
  );
}

export default TeacherEarnings;
