import styles from './courses-by-category.module.scss';
import { CourseSite } from '@ltpx-frontend-apps/api';
import { CourseCard, InputSearch } from '@ltpx-frontend-apps/shared-ui';
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
        <div className={styles['search-course']}>
          <h4>Se muestran 4 cursos disponibles para ti</h4>
          <InputSearch
            className={styles['search-responsive']}
            placeholder="Buscar cursos"
          />
        </div>
        <div className={styles['courses-by-category']}>
          {courses.map((course, index) => (
            <div className={styles['course']} key={index}>
              <CourseCard
                image={course.cover_url}
                category={course.category_slug}
                title={course.title}
                price={course.price_format}
                duration={0}
                achievements={0}
                stars={course.average_rating}
                link={`/course/${course.slug}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoursesByCategory;
