import styles from './achievement-task-form.module.scss';
import {
  AchievementsImages,
  AchievementParams,
  TypeAchievement,
  TaskModel,
  EntityAchievement,
} from '@ltpx-frontend-apps/api';
import { Form, Formik } from 'formik';
import Button, { ColorsButton, TypeButton } from '../button/button';
import Input from '../input/input';
import SelectImage from '../select-image/select-image';
import * as Yup from 'yup';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useCourse } from '@ltpx-frontend-apps/store';

/* eslint-disable-next-line */
export interface AchievementTaskFormProps {
  achievement?: AchievementParams;
  className?: string;
  onSubmit: (data: AchievementParams) => void;
  onCancel?: () => void;
}

export function AchievementTaskForm(props: AchievementTaskFormProps) {
  const { onCancel, onSubmit, className, achievement } = props;
  const [task, setTask] = useState<TaskModel>();
  const { _addTask, course } = useCourse();
  const { tasks } = course;
  const { t } = useTranslation();
  const [indexSelected, setIndexSelected] = useState(-1);


  const initialValues = {
    title: achievement?.title || '',
    image: achievement?.image || '',
    price: achievement?.price || 0,
    file: null,
    rule: TypeAchievement.task,
    settings: [],
    tasks: tasks.map((e) => {
      return {
        text: e.title,
        id: e.id,
        selected: e.id,
      };
    }),
  };

  return (
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          title: Yup.string().required('Titulo no puede estar en blanco'),
          image: Yup.string().required('Es necesario seleccionar una imagen'),
        })}
        onSubmit={(formData) => {
          console.log('formDataAchievement: ', formData);
          onSubmit({
            title: formData.title,
            rule: formData.rule,
            price: formData.price,
            image: formData.image,
            conditions_attributes: [
              {
                entity: EntityAchievement.task,
                entity_id: task?.id || -1,
                must_reach_value: 100,
                points_to_assign: 100,
                description: task?.title,
              },
            ],
          });
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
              <div className={styles['task-content']}>
                <label className={styles['title-task']}>
                  Seleccionar tarea
                </label>
              </div>
              <div>
                {tasks.map((element, index)=> (
                  <div className={styles['task-upload']} key={index}>
                    <h4 className={styles['title-task']}>{element.title}</h4>
                    {index}
                    {element.id}
                  </div>
                ))}
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
  );
}

export default AchievementTaskForm;
