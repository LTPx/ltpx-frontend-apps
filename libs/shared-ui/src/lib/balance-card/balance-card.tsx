import { NavLink } from 'react-router-dom';
import Icon from '../icon/icon';
import styles from './balance-card.module.scss';

/* eslint-disable-next-line */
export interface BalanceCardProps {
  balance: string;
  text: string;
  link?: string;
  credit: boolean;
  className?: string;
}

export function BalanceCard(props: BalanceCardProps) {
  const { balance, text, link, credit, className } = props;

  return (
    <div className={`${styles['container']} ${className}`}>
      <div className={`${styles['icon']} ${credit === true ? '' : styles['debit']}`}>
        <Icon icon='cash' size={20}/>
      </div>
      <div className={styles['content']}>
        <h4>{text}</h4>
        <h2>{balance}</h2>
        <div className={styles['type-content']}>
          {link && (
            <NavLink to={link}>
              <h4 className={styles['link']}>Detalles</h4>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
