import { useState } from 'react';
import Icon from '../icon/icon';
import styles from './panel-accordion.module.scss';

interface ActionButton {
  icon: string;
  onClick: (data?: any) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PanelAccordionProps {
  title: string;
  text?: string;
  data?: any;
  children?: any;
  actions?: ActionButton[];
}

export function PanelAccordion(props: PanelAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { title, text, children, actions, data } = props;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles['container']}>
      <div className={styles['accordion']} onClick={handleClick}>
        <h4>{title}</h4>
        <div className={styles['actions']}>
          { actions?.map((action, index)=>(
            <div
              key={index}
              className={styles['action']}
              onClick={() => {
                action.onClick(data);
              }}
            >
              <Icon icon={action.icon} size={15} />
            </div>
          ))}
          {isOpen === false ? (
            <Icon icon={'plus'} size={20}></Icon>
          ) : (
            <Icon icon={'minus'} size={20}></Icon>
          )}
        </div>
      </div>
      <div className={`${styles['panel']} ${isOpen ? styles['open'] : ''}`}>
        {children ? children : <pre>{text}</pre>}
      </div>
    </div>
  );
}

export default PanelAccordion;
