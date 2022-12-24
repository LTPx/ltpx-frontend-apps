import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './tabs.module.scss';

/* eslint-disable-next-line */
export interface Tab {
  text: string;
  selected?: boolean;
  url?: string;
}

export interface TabsProps {
  tabs: Array<Tab>;
  isNav?: boolean;
  onClickTab?: (indexTab: number) => void;
  vertical?: boolean;
  className?: string;
}

export function Tabs(props: TabsProps) {
  const { tabs, isNav, onClickTab, vertical, className } = props;
  const [indexSelected, setIndexSelected] = useState(0);
  const selectTab = (index: number) => {
    setIndexSelected(index);
    onClickTab && onClickTab(index);
  }

  const classPosition = vertical ? `${styles['container']} ${styles['vertical']}` : styles['container'];

  return (
    <div className={`${classPosition} ${className || ''}` }>
      {isNav && tabs.map((tab, index)=>(
        <NavLink
          key={index}
          className={({ isActive }) =>
            isActive ? `${styles['tab']} ${styles['selected']}` : `${styles['tab']}`
          }
          to={tab.url ? tab.url : ''}
        >
          {tab.text}
        </NavLink>
      ))}
      {!isNav && tabs.map((tab, index)=>(
        <div key={index}
          className={
            indexSelected === index ? `${styles['tab']} ${styles['selected']}` : `${styles['tab']}`
          }
          onClick={()=>{selectTab(index)}}
        >
          {tab.text}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
