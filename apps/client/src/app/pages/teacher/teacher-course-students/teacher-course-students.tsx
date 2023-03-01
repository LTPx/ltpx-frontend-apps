import { useCourseStudents } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styles from './teacher-course-students.module.scss';

/* eslint-disable-next-line */
export interface TeacherCourseStudentsProps {}

export function TeacherCourseStudents(props: TeacherCourseStudentsProps) {
  const { _getStudentsByCourse } = useCourseStudents();
  const [students, setStudents] = useState<any[]>([]);
  const { courseId } = useParams();
  const id = parseInt(courseId || '');

  const fetchData = useCallback(async () => {
    const { success, data, error } = await _getStudentsByCourse(id);
    if (success) {
      setStudents(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`${styles['container']} card with-padding`}>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha de subscription</th>
            <th>Tests</th>
            <th>Logros</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td className={styles['user-name']}>{student.name}</td>
              <td>{student.enrolled_date}</td>
              <td>3/3</td>
              <td>1/3</td>
              <td>
                <NavLink to={`/teacher/courses/${courseId}/student/${student.student_id}`}>
                  Ver Estudiante
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherCourseStudents;
