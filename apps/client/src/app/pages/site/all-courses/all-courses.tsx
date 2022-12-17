import { buildCourses } from '@ltpx-frontend-apps/api';
import { CourseCard } from '@ltpx-frontend-apps/shared-ui';
import { NavLink } from 'react-router-dom';
import styles from './all-courses.module.scss';
import { InputSearch } from '@ltpx-frontend-apps/shared-ui';
import { Select } from '@ltpx-frontend-apps/shared-ui';

/* eslint-disable-next-line */
export interface AllCoursesProps {}
const popularCourses = buildCourses(12);
const categories = [
  {value: 'design', text: 'Design'},
  {value: 'business', text: 'Business'},
  {value: 'software-development', text: 'Software Development'},
  {value: 'personal-development', text: 'Personal Development'},
  {value: 'photography', text: 'Photography'},
  {value: 'audio', text: 'Audio + Music'},
  {value: 'marketing', text: 'Marketing'},
  {value: 'finance', text: 'Finance Accounting'},
]

const sortByOptions = [
  {value: 'price', text: 'Price'},
  {value: 'level', text: 'level'},
  {value: 'rating', text: 'Rating'},
]

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
          <div className={styles['filters']}>
            <InputSearch placeholder='Search Our Courses'/>
            <Select options={categories} />
            <Select options={sortByOptions} />
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
