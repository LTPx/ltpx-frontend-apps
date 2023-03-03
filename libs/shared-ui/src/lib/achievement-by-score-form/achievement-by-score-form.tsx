import styles from './achievement-by-score-form.module.scss';
import {
  AchievementsImages,
  AchievementParams,
  EntityAchievement,
  QuizModel,
  TypeAchievement,
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
/* eslint-disable-next-line */
export interface AchievementByScoreFormProps {
  quizzes: QuizModel[];
  achievement?: AchievementParams;
  onCancel?: () => void;
  onSubmit?: (data: AchievementParams) => void;
  className?: string;
}

export function AchievementByScoreForm(props: AchievementByScoreFormProps) {
  const { quizzes, onCancel, onSubmit, className, achievement } = props;
  const { t } = useTranslation();
  const conditions = achievement
    ? achievement.condition_quizzes_attributes
    : [];
  const quizzesIds = conditions.map((condition) => condition.quiz_id) || [];

  function findConditionId(id: number) {
    return conditions.find((condition) => {
      return condition.quiz_id === id;
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
      };
    }),
    rule: TypeAchievement.score,
    score: 10,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        title: Yup.string().required('Titulo no puede estar en blanco'),
        image: Yup.string().required('Es necesario seleccionar una imagen'),
        score: Yup.number().required('Es necesario agregar una calificación'),
      })}
      onSubmit={(data) => {
        const condition_quizzes_attributes = data.quizzes.map((quiz) => {
          return {
            quiz_id: quiz.id,
            id: quiz.conditionId,
            min_score: data.score,
            _destroy: !quiz.selected
          };
        });
        const { quizzes, ...formData } = {
          ...data,
          ...{
            condition_quizzes_attributes,
            condition_tasks_attributes: [],
          },
        };
        onSubmit && onSubmit(formData);
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
              label={t('achievementByScoreForm.title') || ''}
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              name="title"
              errorMessage={errors.title}
            />
            <br />
            <label>{t('achievementByScoreForm.quiz')}</label>
            <div className={styles['quizzes']}>
              {values.quizzes.map((setting, index) => (
                <div
                  className={`${styles['quiz']} ${
                    setting.selected ? styles['selected'] : ''
                  }`}
                  key={index}
                  onClick={() => {
                    values.quizzes.forEach((setting, i) => {
                      if (index === i) {
                        setFieldValue(
                          `quizzes[${index}].selected`,
                          !setting.selected
                        );
                      } else {
                        setFieldValue(`quizzes[${i}].selected`, false);
                      }
                    });
                    console.log(setting);
                  }}
                >
                  <h4>{setting.text}</h4>
                </div>
              ))}
            </div>
            <br />
            <label>{t('achievementByScoreForm.score')}</label>
            <Input
              className={styles['input']}
              type="number"
              min={10}
              max={100}
              value={values.score}
              onChange={handleChange}
              onBlur={handleBlur}
              name="score"
              errorMessage={errors.score}
            />
            <br />
            <label>{t('achievementByScoreForm.titleImage')}</label>
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
              label={t('achievementByScoreForm.price') || ''}
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

export default AchievementByScoreForm;
