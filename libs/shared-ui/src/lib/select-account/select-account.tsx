import { Avatar } from 'evergreen-ui';
import styles from './select-account.module.scss';
import Icon from '../icon/icon';

/* eslint-disable-next-line */
export interface SelectAccountProps {
  nameAccount: string;
  email: string;
  onClickNewAccount?: () => void;
  onClickCurrentAccount?: () => void;
}

export function SelectAccount(props: SelectAccountProps) {
  const { nameAccount, email, onClickNewAccount, onClickCurrentAccount } = props;

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h4>Registrarme como profesor</h4>
      </div>
      <div className={styles['accounts-content']}>
        <div className={styles['account']} onClick={onClickCurrentAccount}>
          <Icon className={styles['icon']} size={30} icon={'user-fill'} />
          <div className={styles['user-info']}>
            <h4>{email}</h4>
            <h5>{nameAccount}</h5>
          </div>
        </div>
        <div className={styles['account']} onClick={onClickNewAccount}>
          <Icon className={styles['icon']} size={30} icon={'plus'} />
          <h4>Usar otra cuenta</h4>
        </div>
      </div>
    </div>
  );
}

export default SelectAccount;
