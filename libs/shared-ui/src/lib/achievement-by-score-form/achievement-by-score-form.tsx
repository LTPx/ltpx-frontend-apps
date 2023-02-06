import { AchievementParamsUi, AchievementsImages, EntityAchievement, QuizModel, TypeAchievement } from '@ltpx-frontend-apps/api';
import { Form, Formik } from 'formik';
import Button, { ColorsButton, TypeButton } from '../button/button';
import Input from '../input/input';
import SelectImage from '../select-image/select-image';
import styles from './achievement-by-score-form.module.scss';
import * as Yup from 'yup';
import InputTextStatus, { StatusInputText } from '../input-text-status/input-text-status';
import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */
export interface AchievementByScoreFormProps {
  quizzes: QuizModel[];
  achievement?: AchievementParamsUi;
  onCancel?: () => void;
  onSubmit?: (data: AchievementParamsUi) => void;
  className?: string;
}

export function AchievementByScoreForm(props: AchievementByScoreFormProps) {
  const { quizzes, onCancel, onSubmit, className, achievement } = props;
  const ids = achievement?.settings.map((setting)=> setting.entity_id) || [];
  const { t } = useTranslation();

  const initialValues = {
    title: achievement?.title || '',
    image:  achievement?.image || '',
    price:  achievement?.price || 0,
    settings: quizzes.map((quiz)=> {
      return {
        entity: EntityAchievement.quiz,
        text: quiz.name,
        entity_id: quiz.id,
        score: 0,
        selected: ids.includes(quiz.id),
      }
    }),
    rule: TypeAchievement.score,
    score: 10
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
        const settings = data.settings.filter((setting) => {
          return setting.selected
        }).map((s)=> { return {...s, ...{score: data.score}}});
        const formData = {
          ...data,
          ...{
            settings: settings
          },
        };
        console.log('formDataAchievement: ', formData);
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
              label={t('achievementByScoreForm.title')||''}
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              name="title"
              errorMessage={errors.title}
            />
            <br />
            <label>{t('achievementByScoreForm.quiz')}</label>
            <div className={styles['quizzes']}>
              {values.settings.map((setting, index) => (
                <div className={`${styles['quiz']} ${setting.selected ? styles['selected'] : ''}`} key={index}
                  onClick={()=>{
                    values.settings.forEach((setting, i)=>{
                      if (index === i) {
                        setFieldValue(
                          `settings[${index}].selected`,
                          !setting.selected
                        );
                      } else {
                        setFieldValue(
                          `settings[${i}].selected`,
                          false
                        );
                      }
                    })
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
            { errors.image && (
              <InputTextStatus
                status={StatusInputText.error}
                text={errors.image}
              />
            )}
            <Input
              placeholder="1"
              label={t('achievementByScoreForm.price') || ''}
              description='Este valor sera enviado a tu cuenta una vez el alumno alcance este logro'
              type='number'
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
