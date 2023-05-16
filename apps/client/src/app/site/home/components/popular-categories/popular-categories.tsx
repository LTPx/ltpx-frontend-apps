import { CategoryCard } from '@ltpx-frontend-apps/shared-ui';
import styles from './popular-categories.module.scss';
import { useCallback, useEffect } from 'react';
import { useSite } from '@ltpx-frontend-apps/store';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface PopularCategoriesProps {}

export function PopularCategories(props: PopularCategoriesProps) {
  const { categories, _getPopularCategories} = useSite();
  const { t } = useTranslation();

  const fetchData = useCallback(async () => {
    const { error } = await _getPopularCategories();
    if (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles['popular-categories']}>
      <div className={styles['text-categories']}>
        <h2 className={styles['title']}>{t('home.categories.title')}</h2>
        <h4 className={styles['subtitle']}> {t('home.categories.subtitle')}</h4>
      </div>
      <div className={styles['category-content']}>
        {categories.map((category, index) => (
          <CategoryCard
            icon={category.icon}
            key={index}
            title={category.name}
            link={`/courses/${category.slug}`}
          />
        ))}
      </div>
    </div>
  );
}

export default PopularCategories;
