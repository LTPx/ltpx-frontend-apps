import Icon from '../icon/icon';
import styles from './rating.module.scss';

/* eslint-disable-next-line */
export interface RatingProps {
  stars: number;
  text?: string;
}

export function Rating(props: RatingProps) {
  const { stars, text } = props;
  return (
    <div className={styles['stars-container']}>
      <div className={styles['stars']}>
        {Array.from(Array(stars).keys()).map((number, index)=>(
          <Icon key={index} icon={'star'} size={15} color='#eab308'/>
        ))}
        {Array.from(Array(5 - stars).keys()).map((number, index)=>(
          <Icon key={index} icon={'star'} size={15} color='#888888'/>
        ))}
      </div>
      { text && (
        <h5>{text}</h5>
      )}
    </div>
  );
}

export default Rating;
