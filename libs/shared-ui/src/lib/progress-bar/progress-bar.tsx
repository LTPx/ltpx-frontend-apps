import styles from './progress-bar.module.scss';

/* eslint-disable-next-line */
export interface ProgressBarProps {
  percentage: number;
  text?: string;
  className?: string;
  withoutText?: boolean;
}

export function ProgressBar(props: ProgressBarProps) {
  const { percentage, text, className, withoutText } = props;
  const normalizedPercentage = Math.min(Math.max(0, percentage), 100);
  return (
    <div className={`${className}`}>
      {withoutText ? null : (
        <div className={styles['container-text']}>
          <div className={styles['text']}>{text}</div>
          <div className={styles['percentage']}>{normalizedPercentage}%</div>
        </div>
      )}
      <div className={styles['container']}>
        <div
          className={styles['bar']}
          style={{ width: `${normalizedPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
