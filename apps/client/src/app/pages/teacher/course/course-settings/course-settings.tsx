import styles from './course-settings.module.scss';

/* eslint-disable-next-line */
export interface CourseSettingsProps {}

export function CourseSettings(props: CourseSettingsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CourseSettings!</h1>
    </div>
  );
}

export default CourseSettings;
