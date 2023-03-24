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
  const { course } = useCourse();
  const { tasks } = course;
  const { t } = useTranslation();

  const conditions = achievement ? achievement.conditions_attributes : [];
  const taskIds = conditions.map((condition) => condition.entity_id) || [];

  function findConditionId(id: number) {
    return conditions.find((condition) => {
      return condition.entity_id === id;
    })?.id;
  }

  const initialValues = {
    title: achievement?.title || '',
    image: achievement?.image || '',
    price: achievement?.price || 0,
    file: null,
    rule: TypeAchievement.task,
    tasks: tasks.map((task) => {
      const conditionId = findConditionId(task.id);
      return {
        text: task.title,
        id: task.id,
        selected: taskIds.includes(task.id),
        conditionId,
      };
    }),
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        title: Yup.string().required('Titulo no puede estar en blanco'),
        image: Yup.string().required('Es necesario seleccionar una imagen'),
        tasks: Yup.mixed().test((tasks)=>{
          return tasks.find((task: any) => task.selected);
        })
      })}
      onSubmit={(formData) => {
        const conditions = formData.tasks.map((task) => {
          return {
            id: task.conditionId,
            points_to_assign: 100,
            entity: EntityAchievement.task,
            entity_id: task.id,
            must_reach_value: 100,
            description: task.text,
            _destroy: !task.selected,
          };
        });
        onSubmit({
          title: formData.title,
          rule: formData.rule,
          price: formData.price,
          image: formData.image,
          conditions_attributes: conditions,
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
              placeholder="Escribe un nombre interesante"
              label={t('achievementTaskForm.title') || ''}
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              name="title"
              errorMessage={errors.title}
            />
            <br />
            <label>{t('achievementByScoreForm.quiz')}</label>
            <div className={styles['tasks']}>
              {values.tasks.map((task, index) => (
                <div
                  className={`${styles['task']} ${
                    task.selected ? styles['selected'] : ''
                  }`}
                  key={index}
                  onClick={() => {
                    values.tasks.forEach((task, i) => {
                      if (index === i) {
                        setFieldValue(
                          `tasks[${index}].selected`,
                          !task.selected
                        );
                      } else {
                        setFieldValue(`tasks[${i}].selected`, false);
                      }
                    });
                  }}
                >
                  <h4>{task.text}</h4>
                </div>
              ))}
            </div>
            {errors.tasks && (
              <InputTextStatus
                status={StatusInputText.error}
                text={'Se debe seleccionar una tarea'}
              />
            )}
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
