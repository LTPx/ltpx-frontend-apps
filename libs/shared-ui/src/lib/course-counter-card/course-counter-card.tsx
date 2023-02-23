import styles from './course-counter-card.module.scss';

/* eslint-disable-next-line */
export enum ColorsCounterCard {
  green = 'green',
  gray = 'gray',
  orange = 'orange',
  blue = 'blue',
  red = 'red',
  white = 'white',
}

export interface CourseCounterCardProps {
  count: number;
  text: string;
  color?: ColorsCounterCard;
}

export function CourseCounterCard(props: CourseCounterCardProps) {
  const { count, text, color } = props;
  const colorsCard = {
    green: `${styles['card-green']}`,
    gray: `${styles['card-gray']}`,
    orange: `${styles['card-orange']}`,
    blue: `${styles['card-blue']}`,
    red: `${styles['card-red']}`,
    white: `${styles['card-white']}`,
  };
  const selectedColor = colorsCard[color || ColorsCounterCard.green];

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['counter']}>
          <h1 className={`${selectedColor} ${styles['card']}`}>{count}</h1>
        </div>
        <div className={styles['description']}>
          <h3>{text}</h3>
        </div>
      </div>
    </div>
  );
}

export default CourseCounterCard;
