import styles from './setup-card.module.scss';
import Button from '../button/button';
import Icon from '../icon/icon';
import { ReactElement } from 'react';

/* eslint-disable-next-line */
export interface SetupCardProps {
  onClick: () => void;
  icon: string;
  text: string;
  titleButton?: string;
  children?: ReactElement;
}

export function SetupCard(props: SetupCardProps) {
  const { onClick, text, titleButton, icon, children } = props;

  return (
    <div className={styles['container']}>
        <div className={styles['information']}>
          <Icon icon={icon} size={50} />
          <h4>{text}</h4>
          { children ? ( children ) : (
            <Button
              title={titleButton || ''}
              onClick={onClick}
            />
          )}
        </div>
    </div>
  );
}

export default SetupCard;
