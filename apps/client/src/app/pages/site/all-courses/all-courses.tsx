import styles from './all-courses.module.scss';
import { CourseModel } from '@ltpx-frontend-apps/api';
import { CourseCard } from '@ltpx-frontend-apps/shared-ui';
import { InputSearch } from '@ltpx-frontend-apps/shared-ui';
import { Select } from '@ltpx-frontend-apps/shared-ui';
import { useTranslation } from 'react-i18next';
import { useSite } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface AllCoursesProps {}

export function AllCourses(props: AllCoursesProps) {
  const [courses, setCourses] = useState<CourseModel[]>([]);
  const { _getPopularCourses } = useSite();
  const { t } = useTranslation();
  const categories = [
    { value: 'design', text: t('course_categories.design') },
    { value: 'business', text: t('course_categories.business') },
    {
      value: 'software-development',
      text: t('course_categories.software_development'),
    },
    {
      value: 'personal-development',
      text: t('course_categories.personal_development'),
    },
    { value: 'photography', text: t('course_categories.photography') },
    { value: 'audio', text: t('course_categories.audio') },
    { value: 'marketing', text: t('course_categories.marketing') },
    { value: 'finance', text: t('course_categories.finance') },
  ];
  const sortByOptions = [
    { value: 'price', text: t('allCourses.filters.price') },
    { value: 'level', text: t('allCourses.filters.level') },
    { value: 'rating', text: t('allCourses.filters.rating') },
  ];

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
    <div className={styles['container']}>
      <div className={styles['cover']}>
        <div>
          <h1>{t('allCourses.cover.title')}</h1>
          <h4>{t('allCourses.cover.subtitle')}</h4>
        </div>
        <InputSearch
          className={styles['search-responsive']}
          placeholder="Buscar cursos"
        />
      </div>
      <div className={styles['courses-container']}>
        <div className={styles['filters-container']}>
          <div className={styles['text']}>
            Encontramos 20 cursos disponibles para ti
          </div>
          <div className={styles['filters']}>
            <Select options={categories} />
            <Select options={sortByOptions} />
          </div>
        </div>
        <div className={styles['courses']}>
          {courses.map((course, index) => (
            <div className={styles['course']} key={index}>
              <CourseCard
                image={course.cover_url}
                category={course.category}
                title={course.title}
                price={course.price_format}
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
