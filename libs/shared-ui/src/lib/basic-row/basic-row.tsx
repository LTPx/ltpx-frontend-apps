import { Dialog } from 'evergreen-ui';
import { useState } from 'react';
import Button from '../button/button';
import DialogConfirm from '../dialog-confirm/dialog-confirm';
import Icon from '../icon/icon';
import styles from './basic-row.module.scss';

/* eslint-disable-next-line */
export interface BasicRowProps {
  title: string;
  icon?: string;
  image?: string;
  subtitle: string;
  onClick?: () => void;
  remove?: () => void;
}

export function BasicRow(props: BasicRowProps) {
  const { title, icon, subtitle, onClick, remove, image } = props;
  const [openMessage, setOpenMessage] = useState(false);

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['summary']}>
          {icon && <Icon icon={icon || ''} size={20} />}
          {image && <img src={image} />}
          <div className="d">
            <h4>{title}</h4>
            <h5>{subtitle}</h5>
          </div>
        </div>
        <div className={styles['actions']}>
          <div className={styles['action']} onClick={onClick}>
            <Icon icon="pencil" size={15} />
          </div>
          <div
            className={styles['action']}
            onClick={() => setOpenMessage(true)}
          >
            <Icon icon="trash" size={15} />
          </div>
        </div>
      </div>
      <DialogConfirm
        open={openMessage}
        title={'Estas seguro que deseas eliminar?'}
        subtitle="Recuerde que una ves eliminado no podrá volver a recuperar la información"
        confirm={() => {
          remove && remove();
          setOpenMessage(false);
        }}
        onClose={() => setOpenMessage(false)}
      />
    </div>
  );
}

export default BasicRow;
