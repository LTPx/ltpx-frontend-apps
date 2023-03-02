import styles from './achievement-by-quizzes-form.module.scss';
import SelectImage from '../select-image/select-image';
import Input from '../input/input';
import Button, { ColorsButton, TypeButton } from '../button/button';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  AchievementsImages,
  AchievementParams,
  EntityAchievement,
  QuizModel,
  TypeAchievement,
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

  const ids =
    achievement?.condition_quizzes_attributes.map(
      (condition) => condition.quiz_id
    ) || [];

  const initialValues = {
    title: achievement?.title || '',
    image: achievement?.image || '',
    price: achievement?.price || 0,
    settings: quizzes.map((quiz) => {
      return {
        entity: EntityAchievement.quiz,
        text: quiz.name,
        entity_id: quiz.id,
        score: 100,
        selected: ids.includes(quiz.id),
      };
    }),
    rule:
      achievement?.rule || singleSelection
        ? TypeAchievement.single
        : TypeAchievement.multiple,
  };
  console.log('initialValues: ', initialValues);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        title: Yup.string().required('Titulo no puede estar en blanco'),
        image: Yup.string().required('Es necesario seleccionar una imagen'),
      })}
      onSubmit={(data) => {
        const condition_quizzes_attributes = data.settings
          .filter((quiz) => quiz.selected)
          .map((quiz) => {
            return {
              quiz_id: quiz.entity_id,
            };
          });
        const { settings, ...formData } = {
          //remove settings
          ...data,
          ...{
            condition_quizzes_attributes,
            condition_tasks_attributes: [],
          },
        };
        console.log('formDataAchievement: ', formData);
        onSubmit(formData);
        // const dd = achievement?.id ? formData as AchievementParams : formData as NewAchievementParams;
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
              {values.settings.map((setting, index) => (
                <div
                  className={`${styles['quiz']} ${
                    setting.selected ? styles['selected'] : ''
                  }`}
                  key={index}
                  onClick={() => {
                    setFieldValue(
                      `settings[${index}].selected`,
                      !setting.selected
                    );
                    // console.log(setting);
                  }}
                >
                  <h4>{setting.text}</h4>
                </div>
              ))}
            </div>
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

export default AchievementByQuizzesForm;
