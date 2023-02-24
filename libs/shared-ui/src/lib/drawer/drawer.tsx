import styles from './drawer.module.scss';
import { SideSheet } from 'evergreen-ui';
/* eslint-disable-next-line */
export interface DrawerProps {
  open?: boolean;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export function Drawer(props: DrawerProps) {
  const { open, children, className, onClose } = props;
  return (
    <SideSheet isShown={open} onCloseComplete={() => onClose && onClose()}>
      {children}
    </SideSheet>
  );
}

export default Drawer;
