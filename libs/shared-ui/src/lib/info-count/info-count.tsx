import styles from './info-count.module.scss';

/* eslint-disable-next-line */
export enum ColorsInfo {
  green = 'green',
  gray = 'gray',
  orange = 'orange',
}

export interface InfoCountProps {
  count: number;
  text: string;
  color?: ColorsInfo;
}

export function InfoCount(props: InfoCountProps) {
  const { count, text, color } = props;

  const colorsInfo = {
    green: `${styles['info-green']}`,
    gray: `${styles['info-gray']}`,
    orange: `${styles['info-orange']}`,
  };
  const selectedColor = colorsInfo[color || ColorsInfo.gray];

  return (
    <div className={styles['container']}>
      <div className={`${selectedColor} ${styles['content']}`}>
        <h2>{count}</h2>
        <h2>{text}</h2>
      </div>
    </div>
  );
}

export default InfoCount;
