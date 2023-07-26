import { Dialog } from 'evergreen-ui';
import styles from './information-box.module.scss';
import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

/* eslint-disable-next-line */
export interface InformationBoxProps {
  title: string;
  description: string;
  img?: string;
  children?: ReactElement;
  open: boolean;
  link?: string;
  onClose: () => void;
}

export function InformationBox(props: InformationBoxProps) {
  const { title, description, img, open, onClose, children, link } = props;
  return (
    <Dialog
      isShown={open}
      hasFooter={false}
      hasHeader={false}
      onCloseComplete={() => onClose()}
      width={'30vw'}
    >
      <div className={styles['container']}>
        <div className={styles['head']}>
          {img && <img className={styles['img']} src={img} />}
          <h3 className={styles['title']}>{title}</h3>
        </div>
        <div className={styles['content']}>
          <h4>{description}</h4>
          {link && (
            <NavLink to={link}>
              <h4>link</h4>
            </NavLink>
          )}
        </div>
        {children}
      </div>
    </Dialog>
  );
}

export default InformationBox;
