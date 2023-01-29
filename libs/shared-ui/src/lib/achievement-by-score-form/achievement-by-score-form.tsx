import { AchievementModel, AchievementsImages, EntityAchievement, NewAchievementParams, QuizModel, TypeAchievement } from '@ltpx-frontend-apps/api';
import { Form, Formik, useFormik } from 'formik';
import Button, { ColorsButton, TypeButton } from '../button/button';
import Input from '../input/input';
import SelectImage from '../select-image/select-image';
import styles from './achievement-by-score-form.module.scss';
import * as Yup from 'yup';
import InputTextStatus, { StatusInputText } from '../input-text-status/input-text-status';
/* eslint-disable-next-line */
export interface AchievementByScoreFormProps {
  quizzes: QuizModel[];
  achievement?: AchievementModel;
  onCancel?: () => void;
  onSubmit?: (data: NewAchievementParams) => void;
  className?: string;
}

export function AchievementByScoreForm(props: AchievementByScoreFormProps) {
  const { quizzes, onCancel, onSubmit, className, achievement } = props;
  const ids = achievement?.settings.map((setting)=> setting.entity_id) || [];

  const initialValues = {
    title: achievement?.title || '',
    image:  achievement?.image || '',
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
              label="Titulo del logro"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              name="title"
              errorMessage={errors.title}
            />
            <br />
            <label>Que test debe aprobar</label>
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
            <label>Que calificación debe obtener entre (10 - 100)</label>
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
            <label>Selecciona la imagen que obtendrá al cumplir el logro</label>
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
          </div>
          <div className={styles['footer']}>
            <Button
              title="Cancelar"
              color={ColorsButton.white}
              type={TypeButton.button}
              onClick={() => {
                onCancel && onCancel();
              }}
            />
            <Button
              title="Guardar logro"
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
