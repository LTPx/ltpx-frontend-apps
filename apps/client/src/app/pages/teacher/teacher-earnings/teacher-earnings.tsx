import {
  BalanceCard,
  Button,
  ColorsButton,
  EmptyState,
  TransactionRow,
  TransactionStatus,
  TransactionType,
} from '@ltpx-frontend-apps/shared-ui';
import { useTeacher } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect } from 'react';
import styles from './teacher-earnings.module.scss';

export function TeacherEarnings() {
  const { _getWallet, wallet } = useTeacher();
  const NoTransactions = true;
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
  }, []);

  const balance = [
    {
      mount: '$0',
      text: 'Saldo disponible',
      link: '',
    },
    {
      mount: '$0',
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
      {!wallet.id ? (
        <EmptyState
          img="../../../../assets/images/empty-states/set-bank-account.svg"
          title="Pagos en Openmind"
          description="Para recibir pagos primero debes agregar una cuenta bancaria, openmind te depositara cada vez que alguien compre uno de tus cursos"
        >
          <div className={`${styles['button-empty-state']}`}>
            <Button
              title={'Agregar mi cuenta bancaria'}
              color={ColorsButton.primary}
              icon="plus"
              link={'/teacher/account/account-form'}
            />
          </div>
        </EmptyState>
      ) : (
        <div className={styles['content']}>
          <div className={styles['cards-balance']}>
            <BalanceCard
              balance={wallet.total_earnings}
              text='Total por ventas'
            />
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
            {NoTransactions ? (
              <EmptyState
                img="../../../../assets/images/empty-states/money-transfer.svg"
                title="Transacciones"
                description="Todas tus transacciones serán visibles en esta sección"
              />
            ) : (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherEarnings;
