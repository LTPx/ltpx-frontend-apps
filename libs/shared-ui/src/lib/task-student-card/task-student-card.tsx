import { ReactElement, useState } from 'react';
import Button, { ColorsButton } from '../button/button';
import Icon from '../icon/icon';
import styles from './task-student-card.module.scss';
import { Dialog } from 'evergreen-ui';
import TaskFormStudent from '../task-form-student/task-form-student';

/* eslint-disable-next-line */
export interface TaskStudentCardProps {
  title: string;
  description: string;
}

export function TaskStudentCard(props: TaskStudentCardProps) {
  const { title, description } = props;
  const [openModal, setOpenModal] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [task, setTask] = useState('');

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
          {task === '' ? (
            <Button
              title="Entregar tarea"
              icon="pencil"
              onClick={() => setOpenModal(true)}
            />
          ) : (
            <Button
              title="Preview tarea"
              icon="eye"
              color={ColorsButton.secondary}
              outline={true}
              onClick={() => setOpenPreview(true)}
            />
          )}
        </div>
      </div>
      <Dialog
        isShown={openModal}
        hasFooter={false}
        title={title}
        onCloseComplete={() => setOpenModal(false)}
        width={'40vw'}
      >
        <TaskFormStudent
          onClose={() => setOpenModal(false)}
          onSubmit={(title) => {
            // onSubmit && onSubmit(data);
            setTask(title);
          }}
        />
      </Dialog>
      <Dialog
        isShown={openPreview}
        hasFooter={false}
        title={'Tarea: ' + title}
        onCloseComplete={() => setOpenPreview(false)}
        width={'40vw'}
      >
        <h4>{task}</h4>
      </Dialog>
    </>
  );
}

export default TaskStudentCard;
