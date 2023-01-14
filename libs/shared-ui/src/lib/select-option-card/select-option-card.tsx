import Icon from '../icon/icon';
import styles from './select-option-card.module.scss';

/* eslint-disable-next-line */
export interface SelectOptionCardProps {
  title: string;
  text?: string;
  icon: string;
  selected?: boolean;
  value: string;
  onClick?: (key: string | number) => void;
}

export function SelectOptionCard(props: SelectOptionCardProps) {
  const { title, text, icon, selected, onClick, value } = props;

  return (
    <div className={`${styles['container']} ${selected ? styles['selected'] : ''}`}
      onClick={()=> onClick && onClick(value)}
    >
      <div className={styles['content']}>
        <div className={styles['status-content']}>
          <Icon
            icon={selected ? 'circle-filled' : 'circle-outline'}
            size={25}
            color={selected ? '#10b981' : ''}
          />
          <div className={styles['information']}>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </div>
        <div className={styles['icon']}>
          <Icon icon={icon} size={30} color={selected ? '#10b981' : ''} />
        </div>
      </div>
    </div>
  );
}

export default SelectOptionCard;
