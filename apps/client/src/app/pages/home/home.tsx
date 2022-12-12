import { buildCourses } from '@ltpx-frontend-apps/api';
import { Button, ColorsButton, CourseCard } from '@ltpx-frontend-apps/shared-ui';
import { NavLink } from 'react-router-dom';
import styles from './home.module.scss';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {

  const popularCourses = buildCourses(8);

  return (
    <div className={styles['container']}>
      <div className={styles['main-cover']}>
        <div className={styles['cover']}>
          <div className={styles['info']}>
            <div className={styles['text']}>
              <h1>Learn From Anywhere</h1>
              <h4>Tecnology is Bringing A Massive Wave Of Education On Learning Things in different ways</h4>
            </div>
            <div className={styles['actions']}>
              <Button
                color={ColorsButton.primary}
                title="GET STARTED"
                outline={true}
              />
              <Button
                color={ColorsButton.primary}
                title="VIEW COURSES"
              />
            </div>
          </div>
          <img src="https://unireziverse.com/wp-content/uploads/2021/04/illustration-1.png" alt="cover" />
          </div>
      </div>
      <div className={styles['popular-courses-container']}>
        <h2>Popular Courses</h2>
        <h4 className='muted'>
          Discover you perfect program in our courses
        </h4>
        <div className={styles['popular-courses']}>
          { popularCourses.map((course, index)=>(
            <CourseCard
              key={index}
              image={course.image}
              category={course.category}
              title={course.title}
              price={course.price}
              duration={course.duration}
              lessons={course.lessons}
              stars={course.stars}
            />
          ))}
        </div>
        <NavLink
          className={styles['link']}
          to='/courses'
        >
          Browser All
        </NavLink>
      </div>
    </div>
  );
}

export default Home;
