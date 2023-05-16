import styles from './select-icons.module.scss';
import iconSet from '../../assets/icons.json';
import Icon from '../icon/icon';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface SelectIconsProps {
  selected?: string;
  onChange?: (icon: string) => void;
}

export function SelectIcons(props: SelectIconsProps) {
  const { selected, onChange } = props;

  const names = iconSet.icons.map((item) => {
    return item.properties.name;
  });
  const [indexSelected, setIndexSelected] = useState(-1);

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        {names.map((name, index) => (
          <div
            className={
              indexSelected === index || selected === name
                ? `${styles['icon']} ${styles['icon-selected']}`
                : `${styles['icon']}`
            }
            onClick={() => {
              setIndexSelected(index);
              onChange && onChange(name);
            }}
          >
            <Icon icon={name} size={25} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectIcons;
