import styles from './student-courses.module.scss';
import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect } from 'react';
import { UserCourseCard } from '@ltpx-frontend-apps/shared-ui';
/* eslint-disable-next-line */
export interface StudentCoursesProps {}

export function StudentCourses(props: StudentCoursesProps) {
  const { _getStudentCourses, enrolledCourses } = useStudent();

  const fetchCourses = useCallback(async () => {
    const { success, data, error } = await _getStudentCourses();
    if (success) {
      console.log('data: ', data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
      <div className={`${styles['container']}`}>
        <h1>Mis Cursos</h1>
        <br />
        <div className="card with-padding">
          <div className={styles['content']}>
            {enrolledCourses.map((course, index) => (
              <UserCourseCard
                key={index}
                image={course.cover_url}
                startDate={course.created_at}
                title={course.title}
                progress={0}
                url={`/student/courses/${course.id}`}
              />
            ))}
          </div>
        </div>
      </div>
  );
}

export default StudentCourses;
