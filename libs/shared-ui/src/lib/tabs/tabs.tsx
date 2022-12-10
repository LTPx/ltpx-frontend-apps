import { useState } from 'react';
import styles from './tabs.module.scss';

/* eslint-disable-next-line */
export interface Tab {
  text: string;
  selected?: boolean;
}

export interface TabsProps {
  tabs: Array<Tab>;
}

export function Tabs(props: TabsProps) {
  const { tabs } = props;
  const [indexSelected, setIndexSelected] = useState(0);
  const selectTab = (index: number) => {
    setIndexSelected(index)
  }

  return (
    <div className={styles['container']}>
      {tabs.map((tab, index)=>(
        <div key={index}
          className={indexSelected === index ? `${styles['tab-selected']}` : `${styles['tab']}`}
          onClick={()=>{selectTab(index)}}
        >
          {tab.text}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
