import {
  BalanceCard,
  Button,
  ColorsButton,
  EmptyState,
  FormWithdrawal,
  TransactionRow,
  TransactionStatus,
  TransactionType,
} from '@ltpx-frontend-apps/shared-ui';
import { useTeacher } from '@ltpx-frontend-apps/store';
import { Dialog } from 'evergreen-ui';
import { useCallback, useEffect, useState } from 'react';
import styles from './teacher-earnings.module.scss';

export function TeacherEarnings() {
  const { _getWallet, wallet } = useTeacher();
  const [openModal, setOpenModal] = useState(false);
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
              text="Total por ventas"
            />
            <BalanceCard
              balance={wallet.balance_available_withdraw}
              text="Saldo disponible"
            />
            <BalanceCard
              balance={wallet.balance_pending_withdraw}
              text="Pago pendiente"
            />
          </div>
          <div className={styles['title-content']}>
            <h2 className={styles['title']}>Ultimas Transacciones</h2>
            <Button title={'Retirar'} onClick={() => setOpenModal(true)} />
          </div>
          <div className={styles['content-earning']}>
            {wallet.transactions.length === 0 ? (
              <EmptyState
                img="../../../../assets/images/empty-states/money-transfer.svg"
                title="Transacciones"
                description="Todas tus transacciones serán visibles en esta sección"
              />
            ) : (
              <div className={styles['transaction-content']}>
                {wallet.transactions.map((transaction, index) => (
                  <TransactionRow
                    key={index}
                    date={transaction.date}
                    balance={transaction.amount}
                    status={TransactionStatus.completed}
                    type={TransactionType.payment}
                    description={transaction.description}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <Dialog
        isShown={openModal}
        hasFooter={false}
        title={'Hacer un retiro'}
        onCloseComplete={() => setOpenModal(false)}
        width={'40vw'}
      >
        <FormWithdrawal onClose={() => setOpenModal(false)} />
      </Dialog>
    </div>
  );
}

export default TeacherEarnings;
