import { ReactElement, useState } from 'react';
import Button from '../button/button';
import Icon from '../icon/icon';
import styles from './task-student-card.module.scss';
import { Avatar, Dialog } from 'evergreen-ui';
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
  const [editTask, setEditTask] = useState(false);
  const { _sendTask } = useStudent();
  const { enrolledCourse } = useStudent();
  const [showMore, setShowMore] = useState(false);

  async function handleSendTask(params: TaskStudent) {
    const paramsData =
      editTask && studentTask
        ? { ...params, ...{ id: studentTask.id } }
        : params;
    const { data, success, error } = await _sendTask(paramsData);
    if (success) {
      console.log('data: ', data);
    } else {
      console.log('error: ', error);
    }
  }

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['title-section']}>
          <div className={styles['title-task']}>
            <h4>
              <strong>{title}</strong>
            </h4>
            <h4 className={styles['text-gray']}>Tarea</h4>
          </div>
          <div className={styles['status']}>
            {studentTask?.status === 'review' && (
              <h5 className={styles['pending']}>Pendiente</h5>
            )}
            {studentTask?.status === 'approved' && (
              <div className={styles['approved-message']}>
                <h5 className={styles['approved-text']}> Aprobada</h5>
              </div>
            )}
            {studentTask?.status === 'rejected' && (
              <div className={styles['require-changes-message']}>
                <div className={styles['message']}>
                  <h5 className={styles['changes-text']}>Necesita cambios</h5>
                </div>
              </div>
            )}
          </div>
          {/* <Button
              className={styles['btn-status-task']}
              title="pendiente"
              outline={true}
            /> */}
        </div>
        <div className={styles['about-task']}>
          <h4 className={styles['text-gray']}>{description}</h4>
        </div>
        {studentTask?.comments && studentTask?.comments.length > 0 && (
          <div className={styles['comment-teacher']}>
            <div>
              <Avatar src={enrolledCourse.teacher?.profile_image} size={45} />
            </div>
            <div>
              {studentTask?.comments.join(', ').length > 130 ? (
                <div className={styles['text-content']}>
                  <p className={styles['text-description']}>
                    {showMore
                      ? studentTask?.comments
                      : `${studentTask?.comments
                          .join(', ')
                          .substring(0, 130)}....`}
                  </p>
                  <div
                    className={styles['show']}
                    onClick={() => setShowMore(!showMore)}
                  >
                    <h5>{showMore ? 'Mostrar menos' : 'Mostrar mas'}</h5>
                  </div>
                </div>
              ) : (
                <p className={styles['text-description']}>
                  {studentTask?.comments.join(', ')}
                </p>
              )}
            </div>
          </div>
        )}
        <div className={styles['row-buttons']}>
          {studentTask === undefined && (
            <div className={styles['btn-task']}>
              <Button
                title="Hacer la tarea"
                onClick={() => setOpenModal(true)}
              />
            </div>
          )}
          {studentTask?.status === 'rejected' && (
            <div className={styles['btn-task']}>
              <Button
                title="Hacer de nuevo la tarea"
                onClick={() => {
                  setOpenModal(true);
                  setEditTask(true);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <Dialog
        isShown={openModal}
        hasFooter={false}
        title={title}
        onCloseComplete={() => {
          setOpenModal(false);
        }}
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
