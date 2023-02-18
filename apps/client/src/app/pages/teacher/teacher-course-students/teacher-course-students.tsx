import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './teacher-course-students.module.scss';

/* eslint-disable-next-line */
export interface TeacherCourseStudentsProps {}

export function TeacherCourseStudents(props: TeacherCourseStudentsProps) {
  const params = useParams();
  const { courseId } = params;
  const id = parseInt(courseId || '');

  const fetchData = useCallback(async () => {
    // const resp = await getCourse(id);
    // console.log('resp....: ', resp);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles['container']}>
      <h1>Welcome to TeacherCourseStudents!</h1>
    </div>
  );
}

export default TeacherCourseStudents;
