import { TaskStudentCard } from '@ltpx-frontend-apps/shared-ui';
import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect } from 'react';
import styles from './student-course-tasks.module.scss';

/* eslint-disable-next-line */
export interface StudentCourseTasksProps {
  courseId: number;
}

export function StudentCourseTasks(props: StudentCourseTasksProps) {
  const { courseId } = props;
  const { _getStudentTasks, allTasks } = useStudent();

  const fetchTask = useCallback(async () => {
    await _getStudentTasks(courseId);
  }, []);

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div className={styles['tasks']}>
      {allTasks.map((task, index) => (
        <TaskStudentCard
          key={index}
          title={task.title}
          file={task.file_url}
          description={task.description}
          studentTask={task.student_task}
          id={task.id}
        />
      ))}
      {allTasks.length === 0 && <h3>Este curso no tiene tareas</h3>}
    </div>
  );
}

export default StudentCourseTasks;
