import { Tabs } from '@ltpx-frontend-apps/shared-ui';
import { Outlet } from 'react-router-dom';
import styles from './courses-layout.module.scss';

/* eslint-disable-next-line */
export interface CoursesLayoutProps {}

export function CoursesLayout(props: CoursesLayoutProps) {
  const tabs = [
    { text: 'Learning', url: 'learning'},
    { text: 'Finished', url: 'finished'},
    { text: 'Favorites', url: 'favorites'},
  ];

  return (
    <div className={`${styles['container']} card`}>
      <Tabs tabs={tabs} isNav={true}/>
      <Outlet />
    </div>
  );
}

export default CoursesLayout;
