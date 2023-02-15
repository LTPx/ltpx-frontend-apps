import { ReactElement } from 'react';
import styles from './empty-state.module.scss';

/* eslint-disable-next-line */
export interface EmptyStateProps {
  img?: string;
  title?: string;
  description?: string;
  children?: ReactElement;
}

export function EmptyState(props: EmptyStateProps) {
  const { img, title, description, children } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <img className={styles['image']} alt="empty" src={img} />
        <h3 className={styles['title']}>{title}</h3>
        <p className={styles['description']}>{description}</p>
        {children}
      </div>
    </div>
  );
}

export default EmptyState;
