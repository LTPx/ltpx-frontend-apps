import styles from './courses-by-category.module.scss';
import { CourseSite } from '@ltpx-frontend-apps/api';
import {
  CourseCard,
  CourseRowCard,
  InputSearch,
} from '@ltpx-frontend-apps/shared-ui';
import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useSite } from '@ltpx-frontend-apps/store';

/* eslint-disable-next-line */
export interface CoursesByCategoryProps {}

export function CoursesByCategory(props: CoursesByCategoryProps) {
  const [courses, setCourses] = useState<CourseSite[]>([]);
  const { t } = useTranslation();
  const { categoryId } = useParams();
  const { _getCoursesByCategory } = useSite();

  const fetchPopularCourse = useCallback(async () => {
    if (categoryId) {
      const { success, data, error } = await _getCoursesByCategory(categoryId);
      if (success) {
        setCourses(data);
      } else {
        console.log('error: ', error);
      }
    }
  }, []);

  useEffect(() => {
    fetchPopularCourse();
  }, []);

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['title']}>
          <h1>{t(`course_categories.${categoryId}`)}</h1>
          <div className={styles['link-browser']}>
            <NavLink to="/courses">{t('links.toAllCourses')}</NavLink>
          </div>
        </div>
        {courses.length > 0 ? (
          <>
            <div className={styles['search-course']}>
              <h4>Se muestran los siguientes cursos: </h4>
            </div>
            <div className={styles['courses-by-category']}>
              {courses.map((course, index) => (
                <div className={styles['course']} key={index}>
                  <CourseRowCard
                    image={course.cover_url}
                    achievements={course.total_achievements}
                    description={course.description}
                    language={course.language}
                    category={course.category_slug}
                    title={course.title}
                    stars={course.average_rating}
                    link={`/course/${course.slug}`}
                    price={course.price_format}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles['courses-by-category']}>
            <h2>No se encontraron Cursos</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursesByCategory;
