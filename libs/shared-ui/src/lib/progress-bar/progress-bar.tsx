import styles from './progress-bar.module.scss';

/* eslint-disable-next-line */
export interface ProgressBarProps {
  percentage: number;
  text?: string;
  className?: string;
}

export function ProgressBar(props: ProgressBarProps) {
  const { percentage, text, className } = props;
  return (
    <div className={`${className}`}>
      <div className={styles['container-text']}>
        <div className={styles['text']}>{text}</div>
        <div className={styles['percentage']}>{percentage}%</div>
      </div>
      <div className={styles['container']}>
        <div className={styles['bar']} style={{width: `${percentage}%`}}></div>
      </div>
    </div>
  );
}

export default ProgressBar;
