import { ReactElement } from 'react';
import styles from './section-information.module.scss';

/* eslint-disable-next-line */
export interface SectionInformationProps {
  title: string;
  description: string;
  className?: string;
  children?: ReactElement;
  imgUrl?: string;
}

export function SectionInformation(props: SectionInformationProps) {
  const { title, description, children, className, imgUrl } = props;
  return (
    <div className={`${styles['container']} ${className}`}>
      <div className={styles['content']}>
        <h2 className={styles['title']}>{title}</h2>
        <h4 className={styles['description']}>{description}</h4>
        {children}
      </div>
      <img src={imgUrl}/>
    </div>
  );
}

export default SectionInformation;
