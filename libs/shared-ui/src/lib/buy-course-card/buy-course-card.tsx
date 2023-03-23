import { useTranslation } from 'react-i18next';
import Button, { ColorsButton } from '../button/button';
import Icon from '../icon/icon';
import styles from './buy-course-card.module.scss';

/* eslint-disable-next-line */
export interface BuyCourseCardProps {
  image: string;
  price: string;
  discount?: number;
  totalAchievements: number;
  totalContents: number;
  totalEnrolled: number;
  language: string;
  skillLevel: string;
  certificate: boolean;
  onClickBuy?: () => void;
  onClickEnroll: () => void;
}

export function BuyCourseCard(props: BuyCourseCardProps) {
  const {
    image,
    price,
    discount,
    totalAchievements,
    totalContents,
    totalEnrolled,
    language,
    skillLevel,
    certificate,
    onClickBuy,
    onClickEnroll,
  } = props;
  const { t } = useTranslation();

  return (
    <div className={styles['container']}>
      <div className={`${styles['buy-card']}`}>
        <img loading="lazy" src={image} alt="" />
        <div className={`${styles['summary']}`}>
          <div className={styles['price-promo']}>
            <div className={styles['price']}>
              <h2>{price}</h2>
            </div>
            {/* <div className={styles['discount']}>
              <span>{discount || 20}% descuento</span>
            </div> */}
          </div>
          <div className={styles['actions']}>
            {/* <Button
              title={t('coursesDetails.buyCourseCard.buttons.enroll')}
              color={ColorsButton.primary}
              onClick={onClickBuy}
              full={true}
            /> */}
            <Button
              title={t('coursesDetails.buyCourseCard.buttons.enroll')}
              color={ColorsButton.secondary}
              onClick={onClickEnroll}
              full={true}
            />
          </div>
          <div className={styles['details']}>
            <div className={styles['item']}>
              <div className={styles['item-text']}>
                <Icon icon={'trophy'} size={15} color="#888888"></Icon>
                <h4>{t('coursesDetails.buyCourseCard.details.achievement')}</h4>
              </div>
              <h4>{totalAchievements}</h4>
            </div>
            <div className={styles['item']}>
              <div className={styles['item-text']}>
                <Icon icon={'copy'} size={15} color="#888888"></Icon>
                <h4>{t('coursesDetails.buyCourseCard.details.contents')}</h4>
              </div>
              <h4>{totalContents}</h4>
            </div>
            <div className={styles['item']}>
              <div className={styles['item-text']}>
                <Icon icon={'person'} size={15} color="#888888"></Icon>
                <h4>{t('coursesDetails.buyCourseCard.details.enrolled')}</h4>
              </div>
              <h4>{totalEnrolled}</h4>
            </div>
            <div className={styles['item']}>
              <div className={styles['item-text']}>
                <Icon icon={'text-size'} size={15} color="#888888"></Icon>
                <h4>{t('coursesDetails.buyCourseCard.details.language')}</h4>
              </div>
              <h4>{language}</h4>
            </div>
            <div className={styles['item']}>
              <div className={styles['item-text']}>
                <Icon icon={'level'} size={15} color="#888888"></Icon>
                <h4>{t('coursesDetails.buyCourseCard.details.skill')}</h4>
              </div>
              <h4>{skillLevel}</h4>
            </div>
            <div className={styles['item']}>
              <div className={styles['item-text']}>
                <Icon icon={'certificate'} size={15} color="#888888"></Icon>
                <h4>{t('coursesDetails.buyCourseCard.details.certificate')}</h4>
              </div>
              <h4>{certificate ? 'Si' : 'No'}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyCourseCard;
