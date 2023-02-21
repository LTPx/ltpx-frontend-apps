import { ReactElement } from 'react';
import styles from './notice-card.module.scss';

/* eslint-disable-next-line */
export interface NoticeCardProps {
  image?: string;
  title: string;
  description: string;
  children?: ReactElement;
  className?: string;
}

export function NoticeCard(props: NoticeCardProps) {
  const { image, title, description, children, className } = props;
  return (
    <div className={`${styles['content']} ${className}`}>
      {image && <img src={image} />}
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  );
}

export default NoticeCard;
