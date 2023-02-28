import styles from './drawer.module.scss';
import { Position, SideSheet } from 'evergreen-ui';
/* eslint-disable-next-line */

export enum DrawerPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

export interface DrawerProps {
  open?: boolean;
  children: React.ReactNode;
  className?: string;
  width?: number;
  position?: DrawerPosition;
  onClose?: () => void;
}

export function Drawer(props: DrawerProps) {
  const { open, children, className, onClose, width, position } = props;
  return (
    <SideSheet
      position={position}
      width={width}
      isShown={open}
      onCloseComplete={() => onClose && onClose()}
    >
      {children}
    </SideSheet>
  );
}

export default Drawer;
