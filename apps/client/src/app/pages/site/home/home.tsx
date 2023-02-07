import { buildCourses } from '@ltpx-frontend-apps/api';
import {
  Button,
  CategoryCard,
  ColorsButton,
  CourseCard,
  NewsCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styles from './home.module.scss';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  const popularCourses = buildCourses(8);
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
  const news = [
    {
      image:
        'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
      name: t('Ricardo Capa'),
      date: '08 June, 2021',
      title: 'The Best Destinations to Begin Your Round the World Trip',
      link: '/blog/what-is-openmind',
    },
    {
      image:
        'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
      name: t('Ricardo Capa'),
      date: '08 June, 2021',
      title: 'The Best Destinations to Begin Your Round the World Trip',
      link: '/blog/how-openmind-works'
    },
    {
      image:
        'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
      name: t('Ricardo Capa'),
      date: '08 June, 2021',
      title: 'The Best Destinations to Begin Your Round the World Trip',
      link: '/blog/ethics-manual-for-teaching'
    },
  ];

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
      <div className={styles['news-container']}>
        <div className={styles['title-news']}>
          <div className={styles['text-news']}>
            <h1>Aprende sobre OpenMind</h1>
            <h4>Descubra su programa perfecto en nuestros cursos.</h4>
          </div>
          <div className={styles['link']}>
            <NavLink to="/blog"> Ir a Blog </NavLink>
          </div>
        </div>
        <div className={styles['news-content']}>
          {news.map((item, index) => (
            <NewsCard
              key={index}
              image={item.image}
              name={item.name}
              date={item.date}
              title={item.title}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
