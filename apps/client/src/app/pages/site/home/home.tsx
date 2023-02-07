import { buildCourses, CourseModel } from '@ltpx-frontend-apps/api';
import {
  Button,
  CategoryCard,
  ColorsButton,
  CourseCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useSite } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styles from './home.module.scss';

export function Home() {
  const [ courses, setCourses] = useState<CourseModel[]>([])
  const {_getPopularCourses } = useSite();
  const { t } = useTranslation();
  const categories = [
    {
      icon: 'desktop',
      title: t('course_categories.design'),
      description: 'Over 960 courses',
    },
    {
      icon: 'briefcase',
      title: t('course_categories.business'),
      description: 'Over 600 courses',
    },
    {
      icon: 'browser',
      title: t('course_categories.software_development'),
      description: 'Over 320 courses',
    },
    {
      icon: 'user',
      title: t('course_categories.personal_development'),
      description: 'Over 180 courses',
    },
    {
      icon: 'picture',
      title: t('course_categories.photography'),
      description: 'Over 400 courses',
    },
    {
      icon: 'guitar',
      title: t('course_categories.audio'),
      description: 'Over 250 courses',
    },
    {
      icon: 'marketing',
      title: t('course_categories.marketing'),
      description: 'Over 380 courses',
    },
    {
      icon: 'wallet',
      title: t('course_categories.finance'),
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
              <h1>{t('home.cover.title')}</h1>
              <h4>{t('home.cover.subtitle')}</h4>
            </div>
            <div className={styles['actions']}>
              <Button
                color={ColorsButton.secondary}
                title={t('buttons.start')}
                outline={true}
                link="/register"
              />
              <Button
                color={ColorsButton.primary}
                title={t('buttons.courses')}
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
          <h2>{t('home.popularCourse.title')}</h2>
          <h4>{t('home.popularCourse.subtitle')}</h4>
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
          <NavLink to="/courses">{t('home.popularCourse.showAll')}</NavLink>
        </div>
      </div>
      <div className={styles['categories-container']}>
        <div className={styles['text-categories']}>
          <h2>{t('home.categories.title')}</h2>
          <h4> {t('home.categories.subtitle')}</h4>
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
