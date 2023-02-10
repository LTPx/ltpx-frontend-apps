import { buildCourses, CourseModel } from '@ltpx-frontend-apps/api';
import {
  Button,
  CategoryCard,
  ColorsButton,
  CourseCard,
  NewsCard,
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
      id: 1,
      icon: 'desktop',
      title: t('course_categories.design'),
      description: 'Over 960 courses',
      key: 'design',
    },
    {
      id: 2,
      icon: 'briefcase',
      title: t('course_categories.business'),
      description: 'Over 600 courses',
      key: 'business',
    },
    {
      id: 3,
      icon: 'browser',
      title: t('course_categories.software_development'),
      description: 'Over 320 courses',
      key: 'software_development',
    },
    {
      id: 4,
      icon: 'user',
      title: t('course_categories.personal_development'),
      description: 'Over 180 courses',
      key: 'personal_development',
    },
    {
      id: 5,
      icon: 'picture',
      title: t('course_categories.photography'),
      description: 'Over 400 courses',
      key: 'photography',
    },
    {
      id: 6,
      icon: 'guitar',
      title: t('course_categories.audio'),
      description: 'Over 250 courses',
      key: 'audio',
    },
    {
      id: 7,
      icon: 'marketing',
      title: t('course_categories.marketing'),
      description: 'Over 380 courses',
      key: 'marketing',
    },
    {
      id: 8,
      icon: 'wallet',
      title: t('course_categories.finance'),
      description: 'Over 100 courses',
      key: 'finance',
    },
  ];
  const news = [
    {
      image:
        'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8b25saW5lJTIwY2xhc3Nlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      name: t('Openmind'),
      date: '08 June, 2021',
      title: '¿Qué es Open Mind y que es el protocolo LTP?',
      link: '/blog/what-is-openmind',
    },
    {
      image:
        'https://plus.unsplash.com/premium_photo-1661919585183-9656936b6fc1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fG1pbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      name: t('Ricardo Capa'),
      date: '08 June, 2021',
      title: '¿Cómo funciona Open Mind?',
      link: '/blog/how-openmind-works',
    },
    {
      image:
        'https://plus.unsplash.com/premium_photo-1665203434005-3c40f570146f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVhcm5pbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      name: t('Ricardo Capa'),
      date: '08 June, 2021',
      title: '¿Qué es la Potenciación de Larga Duración?',
      link: '/blog/long-term-potentiation',
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
                price={course.price_format}
                duration={0}
                lessons={0}
                stars={course.average_rating}
                link={`/course/${course.id}/details`}
              />
            </div>
          ))}
        </div>
        <div className={styles['link-browser']}>
          <NavLink to="/courses">{t('links.toAllCourses')}</NavLink>
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
              link={`/course/${category.key}/category`}
            />
          ))}
        </div>
      </div>
      <div className={styles['news-container']}>
        <div className={styles['title-news']}>
          <div className={styles['text-news']}>
            <h1>{t('home.news.title')}</h1>
            <h4>{t('home.news.subtitle')}</h4>
          </div>
          <div className={styles['link']}>
            <NavLink to="/blog"> {t('links.toBlog')} </NavLink>
          </div>
        </div>
        <div className={styles['news-content']}>
          {news.map((item, index) => (
            <div className={styles['newsCard']} key={index}>
              <NewsCard
                key={index}
                image={item.image}
                name={item.name}
                date={item.date}
                title={item.title}
                link={item.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
