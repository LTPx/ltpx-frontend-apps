import { ReactElement, useState } from 'react';
import Button, { ColorsButton } from '../button/button';
import styles from './task-student-card.module.scss';
import { Avatar, Dialog } from 'evergreen-ui';
import TaskFormStudent from '../task-form-student/task-form-student';
import { useStudent, useUtil } from '@ltpx-frontend-apps/store';
import { TaskStudent, TaskStudentResult } from '@ltpx-frontend-apps/api';
import Tag, { ColorsTag } from '../tag/tag';

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
  const [openTaskView, setOpenTaskView] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const { _sendTask } = useStudent();
  const { enrolledCourse } = useStudent();
  const [showMore, setShowMore] = useState(false);
  const { setMessageToast } = useUtil();

  async function handleSendTask(params: TaskStudent) {
    const paramsData =
      editTask && studentTask
        ? { ...params, ...{ id: studentTask.id } }
        : params;
    const { success, error } = await _sendTask(paramsData);
    if (success) {
      setMessageToast('success', 'Tu tarea ha sido enviada');
    } else {
      setMessageToast('error', error);
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
            <div className={styles['status']}>
              {studentTask?.status === 'review' && (
                <Tag text={'Enviada para revisar'} color={ColorsTag.white} />
              )}
              {studentTask === undefined && (
                <Tag text={'Pendiente'} color={ColorsTag.gray} />
              )}
              {studentTask?.status === 'approved' && (
                <div className={styles['approved-message']}>
                  <Tag text={'Aprobada'} color={ColorsTag.green} />
                </div>
              )}
              {studentTask?.status === 'rejected' && (
                <div className={styles['message']}>
                  <Tag text={'Necesita cambios'} color={ColorsTag.blue} />
                </div>
              )}
            </div>
          </div>
          <div className={styles['row-buttons']}>
            {studentTask === undefined && (
              <div className={styles['btn-task']}>
                <Button
                  className={styles['btn-task-form']}
                  title="Hacer la tarea"
                  onClick={() => setOpenModal(true)}
                />
              </div>
            )}
            {studentTask?.status === 'rejected' && (
              <div className={styles['btn-task']}>
                <Button
                  className={styles['btn-task-form']}
                  title="Hacer de nuevo la tarea"
                  onClick={() => {
                    setOpenModal(true);
                    setEditTask(true);
                  }}
                />
              </div>
            )}
            {studentTask?.status === 'approved' && (
              <div className={styles['btn-task']}>
                <Button
                  className={styles['btn-task-form']}
                  title="Ver mi respuesta"
                  outline={true}
                  color={ColorsButton.secondary}
                  icon="eye"
                  onClick={() => {
                    setOpenTaskView(true);
                  }}
                />
              </div>
            )}
            {studentTask?.status === 'review' && (
              <div className={styles['btn-task']}>
                <Button
                  className={styles['btn-task-form']}
                  title="Ver mi respuesta"
                  outline={true}
                  color={ColorsButton.secondary}
                  icon="eye"
                  onClick={() => {
                    setOpenTaskView(true);
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles['about-task']}>
          <h4 className={styles['text-gray']}>{description}</h4>
        </div>
        {studentTask?.comments && studentTask?.comments.length > 0 && (
          <div className={styles['comment-teacher']}>
            <div>
              <Avatar src={enrolledCourse.teacher?.profile_image} size={30} />
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
                    <em
                      className={styles['show']}
                      onClick={() => setShowMore(!showMore)}
                    >
                      {showMore ? 'Mostrar menos' : 'Mostrar mas'}
                    </em>
                  </p>
                </div>
              ) : (
                <p className={styles['text-description']}>
                  {studentTask?.comments.join(', ')}
                </p>
              )}
            </div>
          </div>
        )}
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
      <Dialog
        isShown={openTaskView}
        hasFooter={false}
        title={title}
        onCloseComplete={() => {
          setOpenTaskView(false);
        }}
        width={'45vw'}
        topOffset={40}
      >
        <div className={styles['modal-taskView']}>
          <div className={styles['task-wrap']}>
            {/* <div className={styles['task-information']}>
              {description && (
                <h4 className={styles['answer-task']}>
                  Descripción de la Tarea:
                </h4>
              )}
              <div>
                <h4 className={styles['description-task']}>{description}</h4>
                {file && (
                  <a href={file} target="_blank">
                    Archivo adjunto
                  </a>
                )}
              </div>
            </div> */}
            <div className={styles['task-information']}>
              <h4 className={styles['answer-task']}>Tu Respuesta: </h4>
              <div>
                <p className={styles['answer']}>{studentTask?.answer}</p>
                {studentTask?.file_url && (
                  <a href={studentTask?.file_url} target="_blank">
                    Archivo adjunto
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className={styles['footer']}>
            <Button
              title="Cerrar"
              onClick={() => {
                setOpenTaskView(false);
              }}
              color={ColorsButton.white}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default TaskStudentCard;
