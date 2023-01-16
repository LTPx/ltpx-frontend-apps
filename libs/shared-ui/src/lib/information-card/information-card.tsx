import Icon from '../icon/icon';
import styles from './information-card.module.scss';

/* eslint-disable-next-line */
export interface InformationCardProps {
  title: string;
  text: string;
  selected?: boolean;
  icon?: string;
}

export function InformationCard(props: InformationCardProps) {
  const { selected, title, text, icon } = props;
  return (
    <div className={`${styles['container']} ${selected ? styles['selected'] : ''}`} >
      <div className={styles['content']}>
        <div className={styles['status-content']}>
          <div className={styles['information']}>
            <h3 className={`${selected ? styles['selected'] : ''}`}>
              {title}
            </h3>
            <p>{text}</p>
          </div>
        </div>
        <div className={styles['icon']}>
           <Icon icon={icon || ''} size={30} color={selected ? '#10b981' : ''} />
         </div>
      </div>
    </div>
  );
}

export default InformationCard;
