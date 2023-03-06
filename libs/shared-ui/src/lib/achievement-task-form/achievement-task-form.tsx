import {
  AchievementsImages,
  AchievementParams,
  TypeAchievement,
  NewTaskParams,
  TaskModel,
} from '@ltpx-frontend-apps/api';
import { Form, Formik } from 'formik';
import Button, { ColorsButton, TypeButton } from '../button/button';
import FilesUploaded, { TypeFile } from '../files-uploaded/files-uploaded';
import Input from '../input/input';
import SelectImage from '../select-image/select-image';
import styles from './achievement-task-form.module.scss';
import * as Yup from 'yup';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';
import { useTranslation } from 'react-i18next';
import { SetStateAction, useState } from 'react';
import { Dialog } from 'evergreen-ui';
import TaskForm from '../task-form/task-form';
import Icon from '../icon/icon';
import { useCourse } from '@ltpx-frontend-apps/store';

/* eslint-disable-next-line */
export interface AchievementTaskFormProps {
  achievement?: AchievementParams;
  className?: string;
  onSubmit?: (data:AchievementParams) => void;
  onCancel?: () => void;
}

export function AchievementTaskForm(props: AchievementTaskFormProps) {
  const { onCancel, onSubmit, className, achievement } = props;
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [task, setTask] = useState<TaskModel>();
  const { _addTask, course } = useCourse();

  const initialValues = {
    title: achievement?.title || '',
    image: achievement?.image || '',
    price: achievement?.price || 0,
    file: null,
    rule: TypeAchievement.task,
    settings: [],
  };

  async function handleSaveTask (params: NewTaskParams) {
    console.log('task params: ', params);
    const {data, success, error } = await _addTask(course.id, params);
    if (success) {
      setTask(data);
      console.log('data: ', data);
    }else {
      console.log('error: ', error);
    }
  }


  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          title: Yup.string().required('Titulo no puede estar en blanco'),
          image: Yup.string().required('Es necesario seleccionar una imagen'),
        })}
        onSubmit={(formData) => {
          console.log('formDataAchievement: ', formData);
          // onSubmit && onSubmit(formData);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          submitForm,
          errors,
        }) => (
          <Form className={className || ''}>
            <div className={styles['fields']}>
              <Input
                placeholder="Asigna un nombre interesante"
                label={t('achievementTaskForm.title') || ''}
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                name="title"
                errorMessage={errors.title}
              />
              <div className={styles['task-upload']}>
                <label className={styles['title-task']}>
                  {t('achievementTaskForm.task')}
                </label>
                {task ? (
                  <div className={styles['task-content']}>
                    <div className={styles['task']}>
                      <Icon icon={'book'} size={18} />
                      <h4>Tarea: {task.title}</h4>
                    </div>
                    <div>
                      <Button
                        onClick={() => setOpenModal(true)}
                        title={'Editar Tarea'}
                        icon={'pencil'}
                        outline={true}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={styles['btn-add-task']}>
                    <Button
                      onClick={() => setOpenModal(true)}
                      title={'Agregar Tarea'}
                      icon={'plus'}
                      outline={true}
                    />
                  </div>
                )}
              </div>
              <br />
              <label>{t('achievementTaskForm.titleImage')}</label>
              <SelectImage
                selected={values.image}
                onChange={(img) => {
                  setFieldValue('image', img);
                }}
                images={AchievementsImages}
              />
              {errors.image && (
                <InputTextStatus
                  status={StatusInputText.error}
                  text={errors.image}
                />
              )}
              <Input
                placeholder="1"
                label={t('achievementTaskForm.price') || ''}
                description="Este valor sera enviado a tu cuenta una vez el alumno alcance este logro"
                type="number"
                min={1}
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                name="price"
                errorMessage={errors.price}
              />
            </div>
            <div className={styles['footer']}>
              <Button
                title={t('buttons.cancel')}
                color={ColorsButton.white}
                type={TypeButton.button}
                onClick={() => {
                  onCancel && onCancel();
                }}
              />
              <Button
                title={t('buttons.saveAchievement')}
                color={ColorsButton.secondary}
                type={TypeButton.submit}
                onClick={submitForm}
              />
            </div>
          </Form>
        )}
      </Formik>
      <Dialog
        isShown={openModal}
        hasFooter={false}
        hasHeader={false}
        onCloseComplete={() => setOpenModal(false)}
        width={'40vw'}
      >
        <TaskForm
          onClose={() => setOpenModal(false)}
          onSubmit={(params) => {
            handleSaveTask(params);
            // onSubmit && onSubmit(data);
            // setTask(title);
          }}
        />
      </Dialog>
    </>
  );
}

export default AchievementTaskForm;
