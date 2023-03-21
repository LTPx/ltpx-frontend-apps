import Button, { ColorsButton } from '../button/button';
import styles from './dialog-confirm.module.scss';

/* eslint-disable-next-line */
export interface DialogConfirmProps {
  title?: string;
  subtitle?: string;
  confirm?: () => void;
  cancel?: () => void;
}

export function DialogConfirm(props: DialogConfirmProps) {
  const { title, subtitle, cancel, confirm } = props;
  return (
    <div className={styles['dialog-confirm']}>
      <h4 className={styles['title']}>{title}</h4>
      {subtitle && <h4 className={styles['subtitle']}>{subtitle}</h4>}
      <div className={styles['footer']}>
        <Button onClick={cancel} title={'Cancelar'} color={ColorsButton.white} />
        <Button title={'Confirmar'} onClick={confirm}/>
      </div>
    </div>
  );
}

export default DialogConfirm;
