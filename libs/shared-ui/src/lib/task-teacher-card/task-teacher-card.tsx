import { Dialog } from 'evergreen-ui';
import { useState } from 'react';
import Button, { ColorsButton } from '../button/button';
import Icon from '../icon/icon';
import TextArea from '../text-area/text-area';
import styles from './task-teacher-card.module.scss';

/* eslint-disable-next-line */
export interface TaskTeacherCardProps {
  title: string;
  description: string;
  file?: any;
}

export function TaskTeacherCard(props: TaskTeacherCardProps) {
  const { title, description, file } = props;
  const [isCorrect, setIsCorrect] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['row']}>
          <Icon icon={'task-outline'} size={30} />
          <div className={styles['row-info']}>
            <h4>{title}</h4>
          </div>
        </div>
        <div className={styles['row-buttons']}>
          {isCorrect !== true ? (
            <Button
              title="Calificar tarea"
              icon="pencil"
              onClick={() => setOpenModal(true)}
            />
          ) : (
            <Button
              title="Editar calificación"
              icon="eye"
              color={ColorsButton.secondary}
              onClick={() => setOpenModal(true)}
              outline={true}
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
        <div className={styles['task']}>
          <div className={styles['task-content']}>
            <h4 className={styles['description']}>{description}</h4>
            <TextArea 
              label={'Comentario de Tarea (opcional)'}
              rows={5}
            />
          </div>
          <div className={styles['footer']}>
          <Button
              title="No es correcta"
              icon="close"
              onClick={() => {
                setOpenModal(false);
                setIsCorrect(false);
              }}
              outline={true}
              color={ColorsButton.secondary}
            />
            <Button
              title="La tarea es correcta"
              icon="check"
              outline={true}
              onClick={() => {
                setOpenModal(false);
                setIsCorrect(true);
              }}
            />
          </div>
        </div>
      </Dialog>{' '}
    </>
  );
}

export default TaskTeacherCard;
