import Button, { ColorsButton } from '../button/button';
import Icon from '../icon/icon';
import styles from './buy-course-card.module.scss';

/* eslint-disable-next-line */
export interface BuyCourseCardProps {
  image: string;
  price: number;
  discount?: number;
  achievements: number;
  lectures: number;
  enrolled: number;
  language: string;
  skillLevel: string;
  certificate: boolean;
  onClickBuy: () => void;
  onClickEnroll: () => void;
}

export function BuyCourseCard(props: BuyCourseCardProps) {
  const {
    image,
    price,
    discount,
    achievements,
    lectures,
    enrolled,
    language,
    skillLevel,
    certificate,
    onClickBuy,
    onClickEnroll,
  } = props;

  return (
    <div className={styles['container']}>
      <div className={`${styles['buy-card']}`}>
        <img loading="lazy" src={image} alt="" />
        <div className={`${styles['summary']}`}>
          <div className={styles['price-promo']}>
            <div className={styles['price']}>
              <h3>${price}</h3>
            </div>
            <div className={styles['discount']}>
              <span>{discount || 20}% descuento</span>
            </div>
          </div>
          <div className={styles['actions']}>
            <Button
              title="AGREGAR AL CARRITO"
              color={ColorsButton.secondary}
              onClick={onClickBuy}
              full={true}
            />
            <Button
              title="COMPRAR AHORA"
              color={ColorsButton.primary}
              onClick={onClickEnroll}
              full={true}
            />
          </div>
          <div className={styles['details']}>
            <div className={styles['item']}>
              <div className={styles['item-text']}>
                <Icon icon={'trophy'} size={15} color="#888888"></Icon>
                <h4>Achievement</h4>
              </div>
              <h4>{achievements}</h4>
            </div>
            <div className={styles['item']}>
              <div className={styles['item-text']}>
                <Icon icon={'copy'} size={15} color="#888888"></Icon>
                <h4>Contents</h4>
              </div>
              <h4>{lectures}</h4>
            </div>
            <div className={styles['item']}>
              <div className={styles['item-text']}>
                <Icon icon={'user'} size={15} color="#888888"></Icon>
                <h4>Enrolled</h4>
              </div>
              <h4>{enrolled} Students</h4>
            </div>
            <div className={styles['item']}>
              <div className={styles['item-text']}>
                <Icon icon={'text-size'} size={15} color="#888888"></Icon>
                <h4>Language</h4>
              </div>
              <h4>{language}</h4>
            </div>
            <div className={styles['item']}>
              <div className={styles['item-text']}>
                <Icon icon={'sliders'} size={15} color="#888888"></Icon>
                <h4>Skill Level</h4>
              </div>
              <h4>{skillLevel}</h4>
            </div>
            <div className={styles['item']}>
              <div className={styles['item-text']}>
                <Icon icon={'file'} size={15} color="#888888"></Icon>
                <h4>Certificate</h4>
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
