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
  subTitle?: string;
  lock?: boolean;
  text?: string;
  data?: any;
  children?: any;
  classNameSubTitle?: any;
  actions?: ActionButton[];
}

export function PanelAccordion(props: PanelAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    subTitle,
    lock,
    classNameSubTitle,
    title,
    text,
    children,
    actions,
    data,
  } = props;

  const handleClick = () => {
    {
      !lock && setIsOpen(!isOpen);
    }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['accordion']} onClick={handleClick}>
        <div className={styles['title-content']}>
          <h4>{title}</h4>
          <h4 className={`${classNameSubTitle} ${styles['subtitle']}`}>
            {subTitle}
          </h4>
        </div>
        {!lock ? (
          <div className={styles['actions']}>
            {actions?.map((action, index) => (
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
              <Icon icon={'caret-down'} size={20}></Icon>
            ) : (
              <Icon icon={'caret-up'} size={20}></Icon>
            )}
          </div>
        ) : (
          <Icon color="#64748b" icon={'locked'} size={20}></Icon>
        )}
      </div>
      <div className={`${styles['panel']} ${isOpen ? styles['open'] : ''}`}>
        {children ? children : <pre>{text}</pre>}
      </div>
    </div>
  );
}

export default PanelAccordion;
