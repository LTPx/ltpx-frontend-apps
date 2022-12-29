import { buildCourses } from '@ltpx-frontend-apps/api';
import { Button, CategoryCard, CategoryCardProps, ColorsButton, CourseCard } from '@ltpx-frontend-apps/shared-ui';
import { NavLink } from 'react-router-dom';
import styles from './home.module.scss';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {

  const popularCourses = buildCourses(8);
  const categories = [
    {icon: 'desktop', title: 'Design', description:'Over 960 courses'},
    {icon: 'briefcase', title: 'Business', description:'Over 600 courses'},
    {icon: 'browser', title: 'Software Development', description:'Over 320 courses'},
    {icon: 'user', title: 'Personal Development', description:'Over 180 courses'},
    {icon: 'picture', title: 'Photography', description:'Over 400 courses'},
    {icon: 'guitar', title: 'Audio + Music', description:'Over 250 courses'},
    {icon: 'marketing', title: 'Marketing', description:'Over 380 courses'},
    {icon: 'wallet', title: 'Finance Accounting', description:'Over 100 courses'}
  ]

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
                link='/register'
              />
              <Button
                color={ColorsButton.primary}
                title="VIEW COURSES"
                link='/courses'
              />
            </div>
          </div>
          <img src="https://unireziverse.com/wp-content/uploads/2021/04/illustration-1.png" alt="cover" />
          </div>
      </div>
      <div className={styles['popular-courses-container']}>
        <div className={styles['text']}>
          <h2>Popular Courses</h2>
          <h4 className='muted'>
            Discover you perfect program in our courses
          </h4>
        </div>
        <div className={styles['popular-courses']}>
          { popularCourses.map((course, index)=>(
            <NavLink
              key={index}
              to={`/course/${course.id}/details`}
              className={`${styles['link']} link-wrapper`}
            >
              <CourseCard
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
        <div className={styles['link-browser']}>
          <NavLink to='/courses'>
            Browser All
          </NavLink>
        </div>
      </div>
      <div className={styles['categories-container']}>
        <h2>Trending Categories</h2>
        <h4 className='muted'>
          Select your category and discover your perfect class
        </h4>
        <div className={styles['category-content']}>
          {categories.map((category, index)=>(
            <CategoryCard
              icon={category.icon}
              key={index}
              title={category.title}
              description={category.description}/>
            ))}
        </div>
      </div>

    </div>
  );
}

export default Home;
