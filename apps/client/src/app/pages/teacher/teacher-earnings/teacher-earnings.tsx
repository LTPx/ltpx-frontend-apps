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

  return (
    <div className={styles['container']}>
      <h1>Mis Ingresos</h1>
      <div className="card">
        { wallet.id && (
          <>
            <h4>Total de ventas: {wallet.total_earnings}</h4>
            <h4>Saldo disponible para retirar: {wallet.balance_available_withdraw}</h4>
          </>
        )}
      </div>
    </div>
  );
}

export default TeacherEarnings;
