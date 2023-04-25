import { ReactElement } from 'react';
import styles from './course-date-card.module.scss';

/* eslint-disable-next-line */
export interface CourseDateCardProps {
  title: string;
  description: string;
  time: string;
  size?: boolean;
  className?: string;
  children?: ReactElement;
}

export function CourseDateCard(props: CourseDateCardProps) {
  const { title, size, time, description, className, children } = props;
  return (
    <div className={`${styles['content']} ${className}`}>
      <div>
        <h3 className={size ? styles['title-small'] : styles['title']}>{title}</h3>
        <h4 className={styles['time']}>{time}</h4>
        <h4 className={styles['description']}>{description}</h4>
      </div>
      {children && <div className={styles['btn']}>{children}</div>}
    </div>
  );
}

export default CourseDateCard;
