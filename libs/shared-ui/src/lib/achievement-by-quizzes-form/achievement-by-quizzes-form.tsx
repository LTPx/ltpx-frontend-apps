import styles from './achievement-by-quizzes-form.module.scss';
import SelectImage from '../select-image/select-image';
import Input from '../input/input';
import Button, { ColorsButton, TypeButton } from '../button/button';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  AchievementsImages,
  AchievementParams,
  QuizModel,
  TypeAchievement,
  EntityAchievement,
} from '@ltpx-frontend-apps/api';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface AchievementByQuizzesFormProps {
  className?: string;
  quizzes: QuizModel[];
  achievement?: AchievementParams;
  singleSelection?: boolean;
  onCancel?: () => void;
  onSubmit: (data: AchievementParams) => void;
}

export function AchievementByQuizzesForm(props: AchievementByQuizzesFormProps) {
  const { t } = useTranslation();
  const {
    onSubmit,
    onCancel,
    singleSelection,
    quizzes,
    className,
    achievement,
  } = props;

  const conditions = achievement ? achievement.conditions_attributes : [];
  const quizzesIds = conditions.map((condition) => condition.entity_id) || [];

  function findConditionId(id: number) {
    return conditions.find((condition) => {
      return condition.entity_id === id;
    })?.id;
  }

  const initialValues = {
    title: achievement?.title || '',
    image: achievement?.image || '',
    price: achievement?.price || 0,
    quizzes: quizzes.map((quiz) => {
      const conditionId = findConditionId(quiz.id);
      return {
        text: quiz.name,
        id: quiz.id,
        selected: quizzesIds.includes(quiz.id),
        conditionId,
        // score: 100, TODO: add score to approve
      };
    }),
    rule:
      achievement?.rule || singleSelection
        ? TypeAchievement.single
        : TypeAchievement.multiple,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        title: Yup.string().required('Titulo no puede estar en blanco'),
        image: Yup.string().required('Es necesario seleccionar una imagen'),
        quizzes: Yup.mixed().test((quizzes) => {
          return quizzes.find((quiz: any) => quiz.selected);
        }),
      })}
      onSubmit={(data) => {
        if (achievement) {
          const conditions = data.quizzes.map((quiz) => {
            return {
              id: quiz.conditionId,
              points_to_assign: 100,
              entity: EntityAchievement.quiz,
              entity_id: quiz.id,
              must_reach_value: 100,
              description: quiz.text,
              _destroy: !quiz.selected,
            };
          });
          const { quizzes, ...formData } = {
            //remove quizzes
            ...data,
            ...{
              conditions_attributes: conditions,
            },
          };
          onSubmit(formData);
        } else {
          const conditions = data.quizzes
            .filter((quiz) => quiz.selected)
            .map((quiz) => {
              return {
                points_to_assign: 100,
                entity: EntityAchievement.quiz,
                entity_id: quiz.id,
                must_reach_value: 100,
                description: quiz.text,
              };
            });
          const { quizzes, ...formData } = {
            //remove quizzes
            ...data,
            ...{ conditions_attributes: conditions },
          };
          onSubmit(formData);
        }

        // const condition_quizzes_attributes = data.quizzes
        //   .map((quiz) => {
        //     return {
        //       quiz_id: quiz.id,
        //       id: quiz.conditionId,
        //       _destroy: !quiz.selected
        //     };
        //   });
        // const { quizzes, ...formData } = { //remove quizzes
        //   ...data,
        //   ...{
        //     condition_quizzes_attributes,
        //     condition_tasks_attributes: [],
        //   },
        // };
        // console.log('formData: ', data);

        // onSubmit(formData);
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
              label={t('achievementByQuizzesForm.title') || ''}
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              name="title"
              errorMessage={errors.title}
            />
            <br />
            <label>{t('achievementByQuizzesForm.quiz')}</label>
            <div className={styles['quizzes']}>
              {values.quizzes.map((quiz, index) => (
                <div
                  className={`${styles['quiz']} ${
                    quiz.selected ? styles['selected'] : ''
                  }`}
                  key={index}
                  onClick={() => {
                    if (singleSelection) {
                      values.quizzes.forEach((quiz, i) => {
                        if (index === i) {
                          setFieldValue(
                            `quizzes[${index}].selected`,
                            !quiz.selected
                          );
                        } else {
                          setFieldValue(`quizzes[${i}].selected`, false);
                        }
                      });
                    }
                    setFieldValue(`quizzes[${index}].selected`, !quiz.selected);
                  }}
                >
                  <h4>{quiz.text}</h4>
                </div>
              ))}
            </div>
            {errors.quizzes && (
              <InputTextStatus
                status={StatusInputText.error}
                text={'Selecciona al menos un test'}
              />
            )}
            <br />
            <label>{t('achievementByQuizzesForm.titleImage')}</label>
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
              label={t('achievementByQuizzesForm.price') || ''}
              description="Cuando asignes el precio recuerda que OpenMind cobra el 25% de cada logro por los servicios provistos"
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

export default AchievementByQuizzesForm;
