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
  onClickReview?: () => void;
  remove?: () => void;
}

export function BasicRow(props: BasicRowProps) {
  const { title, icon, subtitle, onClick, remove, image, onClickReview } =
    props;
  const [openMessage, setOpenMessage] = useState(false);

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['summary']}>
          <div className={styles['icon-img']}>
            {icon && <Icon icon={icon || ''} size={22} />}
            {image && <img src={image} />}
          </div>
          <div className="d">
            <h4>{title}</h4>
            {subtitle && (
              <>
                {subtitle.length > 190 ? (
                  <h5 className={styles['description']}>
                    {subtitle ? `${subtitle.substring(0, 190)}...` : ''}
                  </h5>
                ) : (
                  <h5>{subtitle}</h5>
                )}
              </>
            )}
          </div>
        </div>
        <div className={styles['actions']}>
          {onClickReview && (
            <div className={styles['action']} onClick={onClickReview}>
              <Icon icon="eye" size={15} />
            </div>
          )}
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
