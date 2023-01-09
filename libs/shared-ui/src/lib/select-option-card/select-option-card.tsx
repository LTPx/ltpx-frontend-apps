import { useState } from 'react';
import Icon from '../icon/icon';
import styles from './select-option-card.module.scss';

/* eslint-disable-next-line */
export interface SelectOptionCardProps {
  title: string;
  text: string;
  icon: string;
  selected: boolean;
}

export function SelectOptionCard(props: SelectOptionCardProps) {
  const { title, text, icon, selected } = props;

  const [itemSelected, setItemSelected] = useState(selected);

  const handleClick = () => {
    setItemSelected(!itemSelected);
  };

  return (
    <div className={styles['container']} onClick={handleClick}>
      <div className={styles['content']}>
        <div className={styles['status-content']}>
          <Icon
            icon={itemSelected ? 'circle-filled' : 'circle-outline'}
            size={25}
            color={itemSelected ? '#10b981' : ''}
          ></Icon>
          <div className={styles['information']}>
            <h3>{title}</h3>
            <h4>{text}</h4>
          </div>
        </div>
        <div className={styles['icon']}>
          <Icon icon={icon} size={35}></Icon>
        </div>
      </div>
    </div>
  );
}

export default SelectOptionCard;
