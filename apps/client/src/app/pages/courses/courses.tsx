import { Tabs } from '@ltpx-frontend-apps/shared-ui';
import styles from './courses.module.scss';

/* eslint-disable-next-line */
export interface CoursesProps {}

export function Courses(props: CoursesProps) {
  const tabs=[
    { text: 'All Courses', selected: true},
    { text: 'Finished'},
    { text: 'Passed'},
    { text: 'Favorites'},
  ]
  return (
    <div className={styles['container']}>
      <Tabs tabs={tabs} />
      <div className="content">

      </div>
    </div>
  );
}

export default Courses;
