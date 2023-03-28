import { ReactElement } from 'react';
import styles from './section-information.module.scss';

/* eslint-disable-next-line */
export interface SectionInformationProps {
  title: string;
  description?: string;
  className?: string;
  children?: ReactElement;
  imgUrl?: string;
}

export function SectionInformation(props: SectionInformationProps) {
  const { title, description, children, className, imgUrl } = props;
  return (
    <div className={`${styles['container']} ${className}`}>
      <div className={styles['content']}>
        <h1 className={styles['title']}>{title}</h1>
        {description && (
          <h3 className={styles['description']}>{description}</h3>
        )}
        {children}
      </div>
      <img src={imgUrl} />
    </div>
  );
}

export default SectionInformation;
