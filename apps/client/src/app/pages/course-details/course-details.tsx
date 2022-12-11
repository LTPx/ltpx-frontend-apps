import { useParams } from 'react-router-dom';
import styles from './course-details.module.scss';

/* eslint-disable-next-line */
export interface CourseDetailsProps {
  id: string
}

export function CourseDetails(props: CourseDetailsProps) {
  const { courseId } = useParams();

  return (
    <div className={styles['container']}>
      <h1>Welcome to CourseDetails!</h1>
    </div>
  );
}

export default CourseDetails;
