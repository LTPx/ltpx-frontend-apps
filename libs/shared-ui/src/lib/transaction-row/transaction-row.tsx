import Icon from '../icon/icon';
import Tag, { ColorsTag } from '../tag/tag';
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
  balance: string;
  status: TransactionStatus;
  transaction: TransactionType;
  descriptionTransaction: string;
}

export function TransactionRow(props: TransactionRowProps) {
  const { date, balance, status, transaction, descriptionTransaction } = props;
  const iconClass = {
    deposit: styles['deposit'],
    withdrawal: styles['withdrawal'],
  };
  const tagConfigs = {
    completed: {
      color: ColorsTag.green,
      text: 'Aprobado',
    },
    rejected: {
      color: ColorsTag.red,
      text: 'Rechazado',
    },
    in_progress: {
      color: ColorsTag.blue,
      text: 'En progreso',
    },
    pending: {
      color: ColorsTag.orange,
      text: 'Pendiente',
    },
  };

  const tagConfig = tagConfigs[status];

  return (
    <div className={styles['container']}>
      {transaction == TransactionType.payment ? (
        <div className={styles['type-transaction']}>
          <Icon
            className={`${iconClass.deposit} ${styles['icon']}`}
            icon={'arrow-right-a'}
            size={25}
          ></Icon>
          <div className={styles['item']}>
            <h4>Pago</h4>
            <h4 className={styles['text']}>{descriptionTransaction}</h4>
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
            <h4 className={styles['text']}>{descriptionTransaction}</h4>
          </div>
        </div>
      )}
      <div className={styles['item']}>
        <h4>{balance}</h4>
        <h4 className={styles['text']}>Monto</h4>
      </div>
      <div className={styles['item']}>
        <h4>{date}</h4>
        <h4 className={styles['text']}>Fecha</h4>
      </div>
      <Tag text={tagConfig.text} color={tagConfig.color} />
    </div>
  );
}

export default TransactionRow;
