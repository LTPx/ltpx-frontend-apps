import styles from './teacher-course-card.module.scss';

/* eslint-disable-next-line */
export interface TeacherCourseCardProps {}

export function TeacherCourseCard(props: TeacherCourseCardProps) {
  
  return (
    <div className={styles['container']}>
      <div className={styles['head-content']}>

      </div>
      <div className={styles['content']}>
        
      </div>
      <div className={styles['end-content']}>
        
      </div>
    </div>
  );
}

export default TeacherCourseCard;
