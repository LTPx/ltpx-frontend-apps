import styles from './popular-courses.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { CourseSite } from '@ltpx-frontend-apps/api';
import { useSite } from '@ltpx-frontend-apps/store';
import { useTranslation } from 'react-i18next';
import { CourseCard } from '@ltpx-frontend-apps/shared-ui';
import { NavLink } from 'react-router-dom';

/* eslint-disable-next-line */
export interface PopularCoursesProps {}

export function PopularCourses(props: PopularCoursesProps) {
  const [courses, setCourses] = useState<CourseSite[]>([]);
  const { _getPopularCourses } = useSite();
  const { t } = useTranslation();

  const fetchPopularCourse = useCallback(async () => {
    const { success, data, error } = await _getPopularCourses();
    if (success) {
      setCourses(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchPopularCourse();
  }, []);

  return (
    <div className={styles['popular-courses-container']}>
    <div className={styles['text']}>
      <h2 className={styles['title']}>{t('home.popularCourse.title')}</h2>
      <h4 className={styles['subtitle']}>
        {t('home.popularCourse.subtitle')}
      </h4>
    </div>
    <div className={styles['popular-courses']}>
      {courses.map((course, index) => (
        <div className={styles['course']} key={index}>
          <CourseCard
            image={course.cover_url}
            category={course.category}
            title={course.title}
            price={course.price_format}
            duration={0}
            achievements={course.total_achievements}
            stars={course.average_rating}
            link={`/course/${course.slug}`}
          />
        </div>
      ))}
    </div>
    <div className={styles['link-browser']}>
      <NavLink to="/courses">{t('links.toAllCourses')}</NavLink>
    </div>
  </div>
  );
}

export default PopularCourses;
