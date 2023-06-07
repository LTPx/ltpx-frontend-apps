import { ReactElement, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './tabs.module.scss';
import { useUtil } from '@ltpx-frontend-apps/store';

/* eslint-disable-next-line */
export interface Tab {
  text: string;
  url?: string;
  children?: ReactElement;
}

export interface TabsProps {
  tabs: Array<Tab>;
  isNav?: boolean;
  vertical?: boolean;
  className?: string;
  classNameText?: string;
  isDisabled?: boolean;
  onClickTab?: (indexTab: number) => void;
  indexTabSelected?: number;
  onConfirm?: () => void;
}

export function Tabs(props: TabsProps) {
  const {
    tabs,
    isNav,
    onClickTab,
    vertical,
    className,
    classNameText,
    indexTabSelected,
    isDisabled,
    onConfirm,
  } = props;
  const [indexSelected, setIndexSelected] = useState(indexTabSelected || 0);
  const selectTab = (index: number) => {
    setIndexSelected(index);
    onClickTab && onClickTab(index);
  };
  // const [isAccept, setIsAccept] = useState(false);

  // const handleConfirmation = () => {
  //   const result = window.confirm(
  //     '¿Estás seguro de que deseas cambiar de pestaña, tienes cambios sin guardar?'
  //   );
  //   if (result) {
  //     setIsAccept(true);
  //   } else {
  //     // Seleccionó "Cancelar" o cerró la ventana
  //     // No realizar ninguna acción
  //   }
  // };
  const classPosition = vertical
    ? `${styles['container']} ${styles['vertical']}`
    : styles['container'];

  return (
    <div className={`${classPosition} ${className || ''}`}>
      {isNav &&
        tabs.map((tab, index) => (
          <NavLink
            key={index}
            className={({ isActive }) =>
              isActive
                ? `${styles['tab']} ${styles['selected']}`
                : `${styles['tab']}`
            }
            to={tab.url ? tab.url : ''}
          >
            {tab.children ? tab.children : <h4>{tab.text}</h4>}
          </NavLink>
        ))}
      {!isNav &&
        tabs.map((tab, index) => (
          <div
            key={index}
            className={
              indexSelected === index
                ? `${styles['tab']} ${styles['selected']}`
                : `${styles['tab']}`
            }
            onClick={
              isDisabled
                ? onConfirm
                : () => {
                    selectTab(index);
                  }
            }
          >
            {tab.children ? (
              tab.children
            ) : (
              <h4 className={`${classNameText} ${styles['text-tab']}`}>
                {tab.text}
              </h4>
            )}
          </div>
        ))}
    </div>
  );
}

export default Tabs;
