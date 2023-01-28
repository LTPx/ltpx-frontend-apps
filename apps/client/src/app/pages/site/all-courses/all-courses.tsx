import { buildCourses } from '@ltpx-frontend-apps/api';
import { CourseCard } from '@ltpx-frontend-apps/shared-ui';
import styles from './all-courses.module.scss';
import { InputSearch } from '@ltpx-frontend-apps/shared-ui';
import { Select } from '@ltpx-frontend-apps/shared-ui';

/* eslint-disable-next-line */
export interface AllCoursesProps {}
const popularCourses = buildCourses(12);
const categories = [
  { value: 'design', text: 'Design' },
  { value: 'business', text: 'Business' },
  { value: 'software-development', text: 'Software Development' },
  { value: 'personal-development', text: 'Personal Development' },
  { value: 'photography', text: 'Photography' },
  { value: 'audio', text: 'Audio + Music' },
  { value: 'marketing', text: 'Marketing' },
  { value: 'finance', text: 'Finance Accounting' },
];

const sortByOptions = [
  { value: 'price', text: 'Price' },
  { value: 'level', text: 'level' },
  { value: 'rating', text: 'Rating' },
];

export function AllCourses(props: AllCoursesProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['cover']}>
        <h1>Find a class or course</h1>
        <h4>Explore and learn new things</h4>
        <InputSearch
          className={styles['search-responsive']}
          placeholder="Search Our Courses"
        />
      </div>
      <div className={styles['courses-container']}>
        <div className={styles['filters-container']}>
          <div className={styles['text']}>
            We found 123 courses available for you
          </div>
          <div className={styles['filters']}>
            <InputSearch
              className={styles['search']}
              placeholder="Search Our Courses"
            />
            <Select options={categories} />
            <Select options={sortByOptions} />
          </div>
        </div>
        <div className={styles['courses']}>
          {popularCourses.map((course, index) => (
            <div className={styles['course']} key={index}>
              <CourseCard
                image={course.cover}
                category={course.category}
                title={course.title}
                price={course.price_cents}
                duration={0}
                lessons={0}
                stars={course.average_rating}
                link={`/course/${course.id}/details`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllCourses;
