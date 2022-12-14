import { Tabs } from '@ltpx-frontend-apps/shared-ui';
import { Outlet } from 'react-router-dom';
import styles from './classes-layout.module.scss';

/* eslint-disable-next-line */
export interface ClassesLayoutProps {}

const tabs = [
  { text: 'Today', url: 'today'},
  { text: 'Calendar', url: 'calendar'},
];

export function ClassesLayout(props: ClassesLayoutProps) {
  return (
    <div className={`${styles['container']} card`}>
      <Tabs tabs={tabs} isNav={true}/>
      <Outlet />
    </div>
  );
}

export default ClassesLayout;
