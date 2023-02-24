import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useSite, useUser } from '@ltpx-frontend-apps/store';
import { CourseModel } from '../../../../libs/api/src';
import { useRouter } from 'next/router';
import {
  Button,
  CategoryCard,
  ColorsButton,
  ContentDescription,
  CourseCard,
  NewsCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  const [ courses, setCourses] = useState<CourseModel[]>([])
  const {_getPopularCourses } = useSite();
  const { isAuthenticated } = useUser();
  const { t } = useTranslation();

  const fetchPopularCourse = useCallback(async () => {
    const { success , data, error} = await _getPopularCourses();
    if ( success ) {
      setCourses(data);
      console.log('data: ', data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchPopularCourse();
  }, []);

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
              {!isAuthenticated && (
                <Button
                  color={ColorsButton.secondary}
                  title={t('buttons.start')}
                  outline={true}
                />
              )}
              <Button
                color={ColorsButton.primary}
                title={t('buttons.courses')}
              />
            </div>
          </div>
          <img
            src="../../public/images/illustration-cover.svg"
            alt="cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
