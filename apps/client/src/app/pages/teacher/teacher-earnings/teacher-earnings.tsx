import styles from './teacher-earnings.module.scss';
import { WithdrawalParams } from '@ltpx-frontend-apps/api';
import {
  BalanceAccount,
  BalanceCard,
  Button,
  ColorsButton,
  EmptyState,
  FormWithdrawal,
  TransactionRow,
  TransactionStatus,
  TransactionType,
} from '@ltpx-frontend-apps/shared-ui';
import { useTeacher, useUser } from '@ltpx-frontend-apps/store';
import { Dialog } from 'evergreen-ui';
import { useCallback, useEffect, useState } from 'react';
import { useMoment } from '../../../hooks/useMoment';

export function TeacherEarnings() {
  const { _getWallet, wallet, _makeWithdrawal } = useTeacher();
  const { user } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const { formatDate } = useMoment();
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

  async function handleWithdrawal(params: WithdrawalParams) {
    const { success, data, error } = await _makeWithdrawal(params);
    if (success) {
      console.log('data: ', data);
    } else {
      console.log('error: ', error);
    }
  }

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
          <div className={styles['balance-info']}>
            <BalanceAccount
              balanceWithdrawal={wallet.balance_pending_withdrawal}
              balanceAvailable={wallet.balance_available_withdrawal}
            />
            <div className={styles['withdrawal-form']}>
              <h2>Retiros</h2>
              <Button
                title={'Retirar'}
                full={true}
                onClick={() => setOpenModal(true)}
              />
              <h5>* Para realizar un retiro debes tener al menos $20 en tu balance disponible</h5>
            </div>
          </div>
          <div className={styles['transactions-container']}>
            {wallet.transactions.length === 0 ? (
              <EmptyState
                img="../../../../assets/images/empty-states/money-transfer.svg"
                title="Transacciones"
                description="Todas tus transacciones serán visibles en esta sección"
              />
            ) : (
              <div className={styles['transactions']}>
                <h2 className={styles['title']}>Ultimas Transacciones</h2>
                {wallet.transactions.map((transaction, index) => (
                  <TransactionRow
                    key={index}
                    date={formatDate(transaction.date)}
                    amount={transaction.amount}
                    status={TransactionStatus.completed}
                    type={
                      transaction.credit
                        ? TransactionType.payment
                        : TransactionType.withdrawal
                    }
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
        <FormWithdrawal
          banks={user.teacher?.bank_accounts || []}
          onClose={() => setOpenModal(false)}
          onSubmit={(params) => handleWithdrawal(params)}
        />
      </Dialog>
    </div>
  );
}

export default TeacherEarnings;
