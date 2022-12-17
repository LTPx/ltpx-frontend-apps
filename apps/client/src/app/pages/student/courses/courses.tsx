import { UserCourseCard, UserCourseCardProps } from '@ltpx-frontend-apps/shared-ui';
import { NavLink } from 'react-router-dom';
import styles from './courses.module.scss';
import { faker } from '@faker-js/faker';

/* eslint-disable-next-line */

export interface CourseEntity {
  title: string;
  date: string;
  progress: string;
}

export enum StateCourses {
  learning = "learning",
  finished = "finished",
  favorites = "favorites",
}

export interface CoursesProps {
  state: StateCourses;
}

// const cour =
export function Courses(props: CoursesProps) {
  const { state } = props;

  const createRandomCourse = (): UserCourseCardProps => (
    {
      id: faker.datatype.uuid(),
      image: faker.image.business(),
      title: faker.random.words(),
      startDate: faker.date.past().toString(),
      progress: 45
    }
  )

  const buildCourses = (amount: number) => {
    const mocks = Array.from(Array(amount).keys())
    return mocks.map(() => {
      const co =  createRandomCourse();
      return co;
    })
  }

  const allCourses = {
    learning: [
      {
        id: '32',
        image: 'https://magazine.startus.cc/wp-content/uploads/2018/07/bitcoin-2643159_1920-e1533112613226.jpg',
        startDate: 'July 9 2022',
        title: 'Learning bitcoin payments',
        progress: 10,
      },
      {
        id: '42',
        image: 'https://courses.wscubetech.com/s/store/courses/5f5338c60cf2d7d974471146/cover.jpg?v=1',
        startDate: 'November 19 2022',
        title: 'Frontend Senior',
        progress: 20,
      }
    ],
    finished: [
      {
        id: '52',
        image: 'https://www.springboard.com/blog/wp-content/uploads/2022/11/7-best-back-end-developer-courses-to-start-your-career-1.jpg',
        startDate: 'October 19 2022',
        title: 'Backend Senior',
        progress: 100,
      }
    ],
    favorites: buildCourses(3)
  }
  const courses = allCourses[state] || allCourses.learning;

  return (
    <div className={`${styles['container']}`}>
      <div className={styles['content']}>
        { courses.map((course, index)=>(
          <NavLink key={index}
            to={`/course/${course.id}/details`}
            className={`${styles['link']} link-wrapper`}
          >
            <UserCourseCard
              image={course.image}
              startDate={course.startDate}
              title={course.title}
              progress={course.progress}
            />
          </NavLink>
        )) }
      </div>
    </div>
  );
}

export default Courses;
