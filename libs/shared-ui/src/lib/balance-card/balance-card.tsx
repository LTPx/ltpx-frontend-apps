import { NavLink } from 'react-router-dom';
import styles from './balance-card.module.scss';

/* eslint-disable-next-line */
export interface BalanceCardProps {
  balance: string;
  text: string;
  link: string;
}

export function BalanceCard(props: BalanceCardProps) {
  const { balance, text, link } = props;

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <h2>{balance}</h2>
        <div className={styles['type-content']}>
          <h4>{text}</h4>
          <NavLink to={link}>
            <h4 className={styles['link']}>Detalles</h4>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
