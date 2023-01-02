import { useState } from 'react';
import Icon from '../icon/icon';
import styles from './panel-accordion.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PanelAccordionProps {
  title: string;
  text?: string;
  children?: any;
}

export function PanelAccordion(props: PanelAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { title, text, children } = props;

  const handleClick = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <div className={styles['container']}>
      <div className={styles['accordion']} onClick={handleClick}>
        <h4>{title}</h4>
        {isOpen === false ? (
          <Icon icon={'plus'} size={20}></Icon>
        ) : (
          <Icon icon={'minus'} size={20}></Icon>
        )}
      </div>
      <div className={`${styles['panel']} ${isOpen ? styles['open'] : ''}`}>
        <p>{text}</p>
        {children}
      </div>
    </div>
  );
}

export default PanelAccordion;
