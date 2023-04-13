import { Dialog, RadioGroup } from 'evergreen-ui';
import { useState } from 'react';
import Button, { ColorsButton, TypeButton } from '../button/button';
import Icon from '../icon/icon';
import TextArea from '../text-area/text-area';
import styles from './task-teacher-card.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';

/* eslint-disable-next-line */
export interface TaskTeacherCardProps {
  title: string;
  fileTeacher?: any;
  answerStudent?: string;
  descriptionTask?: string;
  fileStudent?: any;
  comments: string[];
  status: string;
  onSubmit: (comment: string, status: string) => void;
}

export function TaskTeacherCard(props: TaskTeacherCardProps) {
  const {
    title,
    descriptionTask,
    answerStudent,
    fileStudent,
    fileTeacher,
    onSubmit,
    status,
    comments,
  } = props;
  const [openModal, setOpenModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      comment: '',
      approved: false,
    },
    validationSchema: Yup.object({
      comment: Yup.string().required(
        'Por favor deja un comentario para el alumno'
      ),
    }),
    onSubmit: (formData) => {
      const status = formData.approved ? 'approved' : 'rejected';
      onSubmit(formData.comment, status);
      setOpenModal(false);
    },
  });
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
          {status === 'review' && (
            <Button
              title="Calificar tarea"
              icon="pencil"
              onClick={() => setOpenModal(true)}
            />
          )}
          {status === 'approved' && (
            <div className={styles['approved-message']}>
              <Icon icon="check-circle" size={18} />
              <h5>Tarea marcada como correcta</h5>
            </div>
          )}
          {status === 'rejected' && (
            <div className={styles['require-changes-message']}>
              <Icon icon="pencil" size={18} />
              <h5>La tarea requiere cambios</h5>
            </div>
          )}
        </div>
      </div>
      <Dialog
        isShown={openModal}
        hasFooter={false}
        title={title}
        onCloseComplete={() => setOpenModal(false)}
        width={'45vw'}
        topOffset={40}
      >
        <div className={styles['task']}>
          <div className={styles['task-content']}>
            <div className={styles['task-information']}>
              {descriptionTask && (
                <div className={styles['description']}>
                  <h4 className={styles['description-title-teacher']}>
                    Descripción de la Tarea:
                  </h4>
                  <h4 className={styles['description-task-teacher']}>
                    {descriptionTask}
                  </h4>
                </div>
              )}
              {fileTeacher && (
                <a href={fileTeacher} target="_blank">
                  Archivo adjunto
                </a>
              )}
            </div>
            <div className={styles['task-information']}>
              {answerStudent && (
                <div>
                  <h4 className={styles['title-answer']}>
                    Respuesta del estudiante:
                  </h4>
                  <h4 className={styles['answer']}>{answerStudent}</h4>
                </div>
              )}
              {fileStudent && (
                <a href={fileStudent} target="_blank">
                  Archivo adjunto
                </a>
              )}
            </div>
            <div className="x">
              <label>Como calificas esta tarea</label>
              <RadioGroup
                size={16}
                value={formik.values.approved.toString()}
                options={[
                  { label: 'La tarea es correcta', value: 'true' },
                  { label: 'Necesita cambios', value: 'false' },
                ]}
                onChange={(event) => {
                  formik.setFieldValue(
                    'approved',
                    event.target.value === 'true'
                  );
                }}
              />
            </div>
            <TextArea
              label={'Comentario de tarea'}
              type="text"
              name="comment"
              value={formik.values.comment}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              errorMessage={formik.errors.comment}
              rows={3}
            />
          </div>
          <div className={styles['footer']}>
            <Button
              title="Cancelar"
              onClick={() => {
                setOpenModal(false);
              }}
              color={ColorsButton.white}
            />
            <Button
              title="Enviar calificación"
              type={TypeButton.submit}
              onClick={formik.submitForm}
            />
          </div>
        </div>
      </Dialog>{' '}
    </>
  );
}

export default TaskTeacherCard;
