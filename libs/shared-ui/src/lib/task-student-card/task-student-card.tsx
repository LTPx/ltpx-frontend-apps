import { ReactElement, useState } from 'react';
import Button from '../button/button';
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
  const { title, description, id, studentTask, file } = props;
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
    <div className="row-task">
      <div className={styles['container']}>
        <div className={styles['row']}>
          <div className={styles['row-info']}>
            <h4><strong>{title}</strong></h4>
            <h4 className={styles['description']}>En que consiste: {description}</h4>
            { studentTask?.comments && studentTask?.comments.length > 0 &&
              <div className={styles['comment']}>Comentario: {studentTask?.comments.join(', ')}</div>
            }
          </div>
        </div>
        <div className={styles['row-buttons']}>
          <div className="status">
            {studentTask?.answer &&
              studentTask?.comments.length === 0 &&
              studentTask?.approved === false && <h4>Enviada al profesor</h4>}
            {studentTask?.approved && (
              <div className={styles['approved-message']}>
                <Icon icon="check-circle" size={18} />
                <h5>Tarea aprobada</h5>
              </div>
            )}
            {!studentTask?.approved &&
              studentTask?.comments &&
              studentTask?.comments.length > 0 && (
                <div className={styles['require-changes-message']}>
                  <div className={styles['message']}>
                    <Icon icon="pencil" size={18} />
                    <h5>Necesita cambios</h5>
                  </div>
                </div>
              )}
          </div>
          {studentTask === undefined && (
            <Button title="Hacer la tarea" onClick={() => setOpenModal(true)} />
          )}
          {studentTask?.approved === false &&
            studentTask?.comments &&
            studentTask?.comments.length > 0 && (
              <Button
                title="Hacer de nuevo la tarea"
                onClick={() => setOpenModal(true)}
              />
            )}
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
    </div>
  );
}

export default TaskStudentCard;
