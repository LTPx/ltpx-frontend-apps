import { Tab, Tabs } from '@ltpx-frontend-apps/shared-ui';
import { useCourseStudents } from '@ltpx-frontend-apps/store';
import { Avatar } from 'evergreen-ui';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import styles from './teacher-course-students.module.scss';

/* eslint-disable-next-line */
export interface TeacherCourseStudentsProps {}

export function TeacherCourseStudents(props: TeacherCourseStudentsProps) {
  const { _getStudentsByCourse } = useCourseStudents();
  const [loaded, setLoaded] = useState(false);
  const [optionsTab, setOptionsTab] = useState<Tab[]>([]);
  const { courseId } = useParams();
  const id = parseInt(courseId || '');

  const fetchData = useCallback(async () => {
    const { success, data, error } = await _getStudentsByCourse(id);
    if (success) {
      const students = data;
      const options = students.map((student: any) => { //TODO: add interface student
        return {
          text: student.name,
          url: `/teacher/courses/${courseId}/students/${student.student_id}`,
          children: <TabStudent name={student.name} id={student.name.id} />,
        };
      });
      setOptionsTab(options);
      setLoaded(true);
    } else {
      setLoaded(true);
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
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
          {loaded && (
            <Tabs
              className={styles['tabs']}
              tabs={optionsTab}
              vertical={true}
              isNav={true}
            />
          )}
        </div>
        <div className={styles['information']}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default TeacherCourseStudents;
