import { buildCourses, CourseModel } from '@ltpx-frontend-apps/api';
import {
  Button,
  CategoryCard,
  ColorsButton,
  CourseCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useSite } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './home.module.scss';

export function Home() {
  const [ courses, setCourses] = useState<CourseModel[]>([])
  const {_getPopularCourses } = useSite();
  const popularCourses = buildCourses(8);
  const categories = [
    { icon: 'desktop', title: 'Design', description: 'Over 960 courses' },
    { icon: 'briefcase', title: 'Business', description: 'Over 600 courses' },
    {
      icon: 'browser',
      title: 'Software Development',
      description: 'Over 320 courses',
    },
    {
      icon: 'user',
      title: 'Personal Development',
      description: 'Over 180 courses',
    },
    { icon: 'picture', title: 'Photography', description: 'Over 400 courses' },
    { icon: 'guitar', title: 'Audio + Music', description: 'Over 250 courses' },
    { icon: 'marketing', title: 'Marketing', description: 'Over 380 courses' },
    {
      icon: 'wallet',
      title: 'Finance Accounting',
      description: 'Over 100 courses',
    },
  ];

  const fetchPopularCourse = useCallback(async () => {
    const { success , data, error} = await _getPopularCourses();
    if ( success ) {
      setCourses(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchPopularCourse();
  }, [fetchPopularCourse]);

  return (
    <div className={styles['container']}>
      <div className={styles['main-cover']}>
        <div className={styles['cover']}>
          <div className={styles['info']}>
            <div className={styles['text']}>
              <h1>Aprende desde cualquier lugar</h1>
              <h4>
                La tecnología está trayendo una ola masiva de educación sobre el aprendizaje
                Cosas de diferentes maneras
              </h4>
            </div>
            <div className={styles['actions']}>
              <Button
                color={ColorsButton.secondary}
                title="REGISTRARME"
                outline={true}
                link="/register"
              />
              <Button
                color={ColorsButton.primary}
                title="VER CURSOS"
                link="/courses"
              />
            </div>
          </div>
          <img
            src="../../../../assets/images/illustration-cover.svg"
            alt="cover"
          />
        </div>
      </div>
      <div className={styles['popular-courses-container']}>
        <div className={styles['text']}>
          <h2>Cursos Populares</h2>
          <h4 className="muted">Descubre y aprende en nuestros curso</h4>
        </div>
        <div className={styles['popular-courses']}>
          {courses.map((course, index) => (
            <div className={styles['course']} key={index}>
              <CourseCard
                image={course.cover_url}
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
        <div className={styles['link-browser']}>
          <NavLink to="/courses">Ver todos</NavLink>
        </div>
      </div>
      <div className={styles['categories-container']}>
        <div className={styles['text-categories']}>
          <h2>Trending Categories</h2>
          <h4 className="muted">
            Select your category and discover your perfect class
          </h4>
        </div>
        <div className={styles['category-content']}>
          {categories.map((category, index) => (
            <CategoryCard
              icon={category.icon}
              key={index}
              title={category.title}
              description={category.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
