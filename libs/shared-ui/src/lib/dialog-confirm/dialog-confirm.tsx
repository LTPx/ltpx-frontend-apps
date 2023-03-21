import { Dialog } from 'evergreen-ui';
import Button, { ColorsButton } from '../button/button';
import styles from './dialog-confirm.module.scss';

/* eslint-disable-next-line */
export interface DialogConfirmProps {
  title?: string;
  open?: boolean;
  onClose?: () => void;
  subtitle?: string;
  confirm?: () => void;
}

export function DialogConfirm(props: DialogConfirmProps) {
  const { open, onClose, title, subtitle, confirm } = props;
  return (
    <Dialog
      isShown={open}
      title={title}
      hasFooter={false}
      onCloseComplete={() => {
        onClose && onClose();
      }}
    >
      <div className={styles['dialog-confirm']}>
        {subtitle && <h4 className={styles['subtitle']}>{subtitle}</h4>}
        <div className={styles['footer']}>
          <Button
            onClick={() => {
              onClose && onClose();
            }}
            title={'Cancelar'}
            color={ColorsButton.white}
          />
          <Button title={'Confirmar'} onClick={confirm} />
        </div>
      </div>
    </Dialog>
  );
}

export default DialogConfirm;
