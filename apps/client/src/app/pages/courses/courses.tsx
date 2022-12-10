import { Tabs, UserCourseCard } from '@ltpx-frontend-apps/shared-ui';
import styles from './courses.module.scss';

/* eslint-disable-next-line */

export interface CourseEntity {
  title: string;
  date: string;
  progress: string;
}
export interface CoursesProps {
  courses: Array<CourseEntity>
}

export function Courses(props: CoursesProps) {
  const tabs = [
    { text: 'All Courses', selected: true},
    { text: 'Finished'},
    { text: 'Passed'},
    { text: 'Favorites'},
  ];

  return (
    <div className={styles['container']}>
      <Tabs tabs={tabs} />
      <div className={styles['content']}>
        <UserCourseCard
          image={'https://magazine.startus.cc/wp-content/uploads/2018/07/bitcoin-2643159_1920-e1533112613226.jpg'}
          startDate={'July 9 2022'}
          title={'Learning bitcoin payments'}
          progress={0}
        />
      </div>
    </div>
  );
}

export default Courses;
