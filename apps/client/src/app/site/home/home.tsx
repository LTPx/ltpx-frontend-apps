import {
  Button,
  ColorsButton,
  ContentDescription,
  NewsCard,
  SectionInformation,
} from '@ltpx-frontend-apps/shared-ui';
import { useUser } from '@ltpx-frontend-apps/store';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styles from './home.module.scss';
import PopularCategories from './components/popular-categories/popular-categories';
import PopularCourses from './components/popular-courses/popular-courses';

export function Home() {
  const { isAuthenticated } = useUser();
  const { t } = useTranslation();
  const news = [
    {
      image:
        'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8b25saW5lJTIwY2xhc3Nlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      name: t('Openmind'),
      date: '08 June, 2021',
      title: '¿Qué es OpenMind y que es el protocolo LTP?',
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

  return (
    <div className={styles['container']}>
      <div className={styles['main-cover']}>
        <div className={styles['cover']}>
          <div className={styles['info']}>
            <div className={styles['text']}>
              <h1 className={styles['title']}>{t('home.cover.title')}</h1>
              <h4>{t('home.cover.subtitle')}</h4>
            </div>
            <div className={styles['actions']}>
              {!isAuthenticated && (
                <Button
                  color={ColorsButton.secondary}
                  title={t('buttons.start')}
                  outline={true}
                  link="/register"
                />
              )}
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
        <img
          className={styles['image-cover']}
          src="../../../../assets/images/bg_geometrik.svg"
          alt="cover"
        />
      </div>
      <ContentDescription />
      <PopularCourses/>
      <PopularCategories/>
      <div className={styles['news-container']}>
        <div className={styles['title-news']}>
          <div className={styles['text-news']}>
            <h1 className={styles['title']}>{t('home.news.title')}</h1>
            <h4 className={styles['subtitle']}>{t('home.news.subtitle')}</h4>
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
      {!isAuthenticated && (
        <SectionInformation
          className={styles['section-content']}
          title={'Postula para Profesor'}
          imgUrl={'../../../../assets/images/bg_shape.svg'}
          description={
            '¡Únete a nosotros y empieza a generar ingresos sin problemas!'
          }
        >
          <div className={styles['btn']}>
            <Button title={'Registrarme Ahora'} link={'/register-teacher'} />
          </div>
        </SectionInformation>
      )}
    </div>
  );
}

export default Home;
