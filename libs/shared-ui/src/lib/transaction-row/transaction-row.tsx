import Icon from '../icon/icon';
import styles from './transaction-row.module.scss';

/* eslint-disable-next-line */
export enum TransactionStatus {
  completed = 'completed',
  pending = 'pending',
  in_progress = 'in_progress',
  rejected = 'rejected',
}

export enum TransactionType {
  payment = 'payment',
  withdrawal = 'withdrawal',
}
export interface TransactionRowProps {
  date: string;
  amount: string;
  status: TransactionStatus;
  type: TransactionType;
  description: string;
}

export function TransactionRow(props: TransactionRowProps) {
  const { date, amount, type, description } = props;
  const iconClass = {
    deposit: styles['deposit'],
    withdrawal: styles['withdrawal'],
  };

  return (
    <div className={styles['rows']}>
      {type == TransactionType.payment ? (
        <div className={styles['type-transaction']}>
          <Icon
            className={`${iconClass.deposit} ${styles['icon']}`}
            icon={'money'}
            size={25}
          ></Icon>
          <div className={styles['item']}>
            <h4>Deposito</h4>
            <h4 className={styles['text']}>{description}</h4>
          </div>
        </div>
      ) : (
        <div className={styles['type-transaction']}>
          <Icon
            className={`${iconClass.withdrawal} ${styles['icon']}`}
            icon={'arrow-left-a'}
            size={25}
          ></Icon>
          <div className={styles['item']}>
            <h4>Retiro</h4>
            <h4 className={styles['text']}>{description}</h4>
          </div>
        </div>
      )}
      <div className={styles['item']}>
        <h4>{date}</h4>
        <h4 className={styles['text']}>Fecha</h4>
      </div>
      <div className={`${styles['item']} ${styles['end']}`}>
        <h4
          className={
            type === TransactionType.payment
              ? styles['payment']
              : styles['withdrawal']
          }
        >
          {type === TransactionType.payment ? `+ ${amount}` : `- ${amount}`}
        </h4>
        <h4 className={styles['text']}>Monto</h4>
      </div>
    </div>
  );
}

export default TransactionRow;
