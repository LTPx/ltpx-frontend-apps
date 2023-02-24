import { Popover } from 'evergreen-ui';
import styles from './dropdown.module.scss';
import { ReactElement } from 'react';

export interface DropdownProps {
  children: ReactElement[];
}

export function Dropdown(props: DropdownProps) {
  const { children } = props;
  return (
    <Popover bringFocusInside content={children[0]}>
      <div className={styles['trigger']}>{children[1]}</div>
    </Popover>
  );
}

export default Dropdown;
