import { buildCourses } from '@ltpx-frontend-apps/api';
import { CourseCard } from '@ltpx-frontend-apps/shared-ui';
import { NavLink } from 'react-router-dom';
import styles from './all-courses.module.scss';

/* eslint-disable-next-line */
export interface AllCoursesProps {}
const popularCourses = buildCourses(12);

export function AllCourses(props: AllCoursesProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['cover']}>
        <h1>Find a class or course</h1>
        <h4>Explore and learn new things</h4>
      </div>
      <div className={styles['courses-container']}>
        <div className={styles['filters-container']}>
          <div className="text">
            We found 123 courses available for you
          </div>
          <div className="filters">
          <select name="categories">
            <option value="value1">Art</option>
            <option value="value2" selected>Education</option>
            <option value="value3">Sports</option>
          </select>
          <select name="language">
            <option value="value1">English</option>
            <option value="value2" selected>Spanish</option>
            <option value="value3">French</option>
          </select>
          </div>
        </div>
        <div className={styles['courses']}>
        { popularCourses.map((course, index)=>(
            <NavLink key={index}
              to={`/course/${course.id}/details`}
              className={`${styles['link']} link-wrapper`}
            >
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
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllCourses;
