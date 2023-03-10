import { Tab, Tabs } from '@ltpx-frontend-apps/shared-ui';
import { useCourse, useCourseStudents } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TeacherViewStudent from '../teacher-view-student/teacher-view-student';
import styles from './teacher-course-students.module.scss';

/* eslint-disable-next-line */
export interface TeacherCourseStudentsProps {}

export function TeacherCourseStudents(props: TeacherCourseStudentsProps) {
  const { _getStudentsByCourse } = useCourseStudents();
  const [loaded, setLoaded] = useState(false);
  const [idStudent, setIdStudent] = useState<number>();
  const [optionsTab, setOptionsTab] = useState<Tab[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const { courseId } = useParams();
  const id = parseInt(courseId || '');

  const fetchStudents = useCallback(async () => {
    const { success, data, error } = await _getStudentsByCourse(id);
    if (success) {
      const students = data;
      const options = students.map((student: any) => {
        //TODO: add interface student
        return {
          text: student.name,
          children: <TabStudent name={student.name} id={student.name.id} />,
        };
      });
      setStudents(students);
      setOptionsTab(options);
      setLoaded(true);
      console.log(idStudent);
    } else {
      setLoaded(true);
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, []);

  const TabStudent = ({ name, id }: { name: string; id: number }) => (
    <div className={styles['tab-options']}>
      <Avatar name={name} size={30} />
      {name}
    </div>
  );

  return (
    <div className={styles['container']}>
      <h2 className={styles['title']}>Curso: {optionsTab.length}</h2>
      <div className={styles['content']}>
        <div className={styles['all-students']}>
          <div className={styles['all-students-header']}>
            <h3>Estudiantes</h3>
            <h3>{ loaded ? students.length : 0}</h3>
          </div>
          {loaded && (
            <Tabs
              className={styles['tabs']}
              tabs={optionsTab}
              vertical={true}
              onClickTab={(index) => {
                setIdStudent(students[index].student_id);
              }}
            />
          )}
        </div>
        <div className={styles['information']}>
          {idStudent && <TeacherViewStudent studentId={idStudent} />}
        </div>
      </div>
    </div>
  );
}

export default TeacherCourseStudents;
