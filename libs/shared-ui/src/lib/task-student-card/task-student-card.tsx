import { ReactElement, useState } from 'react';
import Button, { ColorsButton } from '../button/button';
import Icon from '../icon/icon';
import styles from './task-student-card.module.scss';
import { Dialog } from 'evergreen-ui';
import TaskFormStudent from '../task-form-student/task-form-student';
import { useStudent } from '@ltpx-frontend-apps/store';
import { TaskStudent, TaskStudentResult } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface TaskStudentCardProps {
  title: string;
  description: string;
  id: number;
  file?: any;
  children?: ReactElement;
  studentTask?: TaskStudentResult;
}

export function TaskStudentCard(props: TaskStudentCardProps) {
  const { title, description, id, studentTask,file } = props;
  const [openModal, setOpenModal] = useState(false);
  const { _sendTask } = useStudent();

  async function handleSendTask(params: TaskStudent) {
    const { data, success, error } = await _sendTask(params);
    if (success) {
      console.log('data: ', data);
    } else {
      console.log('error: ', error);
    }
  }

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['row']}>
          <Icon icon={'task-outline'} size={30} />
          <div className={styles['row-info']}>
            <h4>{title}</h4>
            <h4 className={styles['description']}>{description}</h4>
          </div>
        </div>
        <div className={styles['row-buttons']}>
          {!studentTask && (
            <Button
              title="Entregar tarea"
              icon="pencil"
              onClick={() => setOpenModal(true)}
            />
          )}
          {studentTask?.answer && <h4>Esperando revision del docente</h4>}
          {studentTask?.approved && <h4>Aprobado</h4>}
        </div>
      </div>
      <Dialog
        isShown={openModal}
        hasFooter={false}
        title={title}
        onCloseComplete={() => setOpenModal(false)}
        width={'50vw'}
      >
        <TaskFormStudent
          description={description}
          fileTask={file}
          onClose={() => setOpenModal(false)}
          onSubmit={(data) => {
            handleSendTask({ ...data, ...{ task_id: id } });
          }}
        />
      </Dialog>
    </>
  );
}

export default TaskStudentCard;
