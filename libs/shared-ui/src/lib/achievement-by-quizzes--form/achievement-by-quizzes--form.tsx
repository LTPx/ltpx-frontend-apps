import styles from './achievement-by-quizzes--form.module.scss';
import SelectImage from '../select-image/select-image';
import Input from '../input/input';
import Button, { ColorsButton, TypeButton } from '../button/button';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  AchievementsImages,
  EntityAchievement,
  NewAchievementParams,
  QuizModel,
  TypeAchievement,
} from '@ltpx-frontend-apps/api';
import InputTextStatus, { StatusInputText } from '../input-text-status/input-text-status';

/* eslint-disable-next-line */
export interface AchievementByQuizzesFormProps {
  singleSelection?: boolean;
  onCancel?: () => void;
  onSubmit?: (data: NewAchievementParams) => void;
  quizzes: QuizModel[];
  className?: string;
}

export function AchievementByQuizzesForm(props: AchievementByQuizzesFormProps) {
  const { onSubmit, onCancel, singleSelection, quizzes, className } = props;

  return (
    <Formik
      initialValues={{
        title: '',
        image: '',
        settings: quizzes.map((quiz)=> {
          return {
            entity: EntityAchievement.quiz,
            text: quiz.name,
            entity_id: quiz.id,
            score: 100,
            selected: false,
          }
        }),
        rule: singleSelection
          ? TypeAchievement.single
          : TypeAchievement.multiple,
      }}
      validationSchema={Yup.object({
        title: Yup.string().required('Titulo no puede estar en blanco'),
        image: Yup.string().required('Es necesario seleccionar una imagen'),
      })}
      onSubmit={(data) => {
        const settings = data.settings.filter((setting) => {
          return setting.selected
        });
        const formData = {
          ...data,
          settings,
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
                    setFieldValue(
                      `settings[${index}].selected`,
                      !setting.selected
                    );
                  }}
                >
                  <h4>{setting.text}</h4>
                </div>
              ))}
            </div>
            <br />
            <label>Selecciona la imagen que obtendrá al cumplir el logro</label>
            <SelectImage
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

export default AchievementByQuizzesForm;
