import { TaskModel } from '@ltpx-frontend-apps/api';
import { TaskStudentCard } from '@ltpx-frontend-apps/shared-ui';
import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import styles from './student-course-tasks.module.scss';

/* eslint-disable-next-line */
export interface StudentCourseTasksProps {
  courseId: number;
}

export function StudentCourseTasks(props: StudentCourseTasksProps) {
  const { courseId } = props;
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const { _getStudentTasks } = useStudent();

  const fetchTask = useCallback(async () => {
    const { success, data, error } = await _getStudentTasks(courseId);
    if (success) {
      console.log('data: ', data);
      setTasks(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div className={styles['tasks']}>
      {tasks.map((task, index) => (
        <TaskStudentCard
          key={index}
          title={task.title}
          description={task.description}
        />
      ))}
    </div>
  );
}

export default StudentCourseTasks;
