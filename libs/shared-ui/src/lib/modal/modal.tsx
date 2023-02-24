import styles from './modal.module.scss';

/* eslint-disable-next-line */
export interface ModalProps {
  children?: any;
  open?: boolean
}

export function Modal(props: ModalProps) {
  const { children, open } = props;

  const ModalComponent = () => (
    <div className={styles['container']}>
      <div className={styles['content']}>
        { children }
      </div>
    </div>
  )

  return (
    open ? <ModalComponent/> : <></>
  )
}

export default Modal;
