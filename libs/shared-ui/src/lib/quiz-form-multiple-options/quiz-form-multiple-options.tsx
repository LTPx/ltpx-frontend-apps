import styles from './quiz-form-multiple-options.module.scss';
import Icon from '../icon/icon';
import Input from '../input/input';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { generateAlphabet } from 'libs/api/src/lib/utils';
import Button, { ColorsButton, TypeButton } from '../button/button';
import { FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { QuestionQuiz, TypeQuestionQuiz } from '@ltpx-frontend-apps/api';
import { useTranslation } from 'react-i18next';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';

/* eslint-disable-next-line */
export interface QuizFormMultipleOptionsProps {
  question?: QuestionQuiz;
  className?: string;
  singleSelection?: boolean;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
}

export function QuizFormMultipleOptions(props: QuizFormMultipleOptionsProps) {
  const { onSubmit, onCancel, singleSelection, className, question } = props;
  const { t } = useTranslation();

  const alphabetLetters = generateAlphabet();

  const initialValues = {
    id: question?.id,
    kind: singleSelection ? TypeQuestionQuiz.single : TypeQuestionQuiz.multiple,
    question: question?.question || '',
    description: question?.description || '',
    points: question?.points || 1,
    answers_attributes: question?.answers_attributes || [
      {
        text: '',
        correct: false,
        question_id: null,
        id: null,
      },
      {
        text: '',
        correct: false,
        question_id: null,
        id: null,
      },
    ],
  };

  return (
    <div className={styles['questions']}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          question: Yup.string().required(
            'La pregunta no puede estar en blanco'
          ),
          points: Yup.number()
            .required('Necesitas agregar puntos')
            .min(1, 'El valor debe ser mayor a 0')
            .max(100, 'El valor debe ser menor o igual a 100'),
          answers_attributes: Yup.array()
            .of(
              Yup.object().shape({
                text: Yup.string().required(
                  'Debes ingresar el texto de la respuesta'
                ),
                correct: Yup.boolean(),
              })
            )
            .min(2, 'Debes ingresar al menos dos respuestas')
            .test(
              'at-least-one-correct',
              'Debes marcar al menos una respuesta como correcta',
              (value) => {
                if (!value) return false;
                return value.some((answer) => answer.correct);
              }
            )
            .test(
              'no-empty-answers',
              'Las respuestas no pueden estar vacías',
              (value) => {
                if (!value) return false;
                return value.every((answer) => answer?.text?.trim() !== '');
              }
            ),
        })}
        onSubmit={(values) => {
          console.log('values: ', values);
          onSubmit(values);
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
          <Form
            className={styles['form-quiz-options']}
            // className={className || 'form-quiz-options}
          >
            <div className={styles['fields']}>
              <Input
                label={t('quizFormMultipleOptions.question') || ''}
                name="question"
                placeholder="Formula tu pregunta"
                value={values.question}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.question}
              />
              <Input
                label={t('quizFormMultipleOptions.description') || ''}
                name="description"
                placeholder="Alguna observación antes de responder esta pregunta"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.description}
              />
              <Input
                label={t('quizFormMultipleOptions.points') || ''}
                type="number"
                name="points"
                placeholder="Alguna observación antes de responder esta pregunta"
                value={values.points}
                onChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.points}
              />
              <br />
              <label>{t('quizFormMultipleOptions.answer')}</label>
              <FieldArray
                name="answers_attributes"
                render={({ form, push, remove }) => (
                  <div>
                    {values.answers_attributes.map((answer, index) => (
                      <div
                        className={`${styles['answer']} ${
                          singleSelection ? styles['single'] : ''
                        }`}
                        key={index}
                      >
                        {!singleSelection && (
                          <div className={styles['letter']}>
                            <h2>{alphabetLetters[index]}.</h2>
                          </div>
                        )}
                        <Input
                          placeholder="Ingresa una respuesta"
                          className={styles['answer-input']}
                          value={answer.text}
                          onBlur={handleBlur}
                          name={`answers_attributes[${index}].text`}
                          onChange={handleChange}
                          errorMessage={
                            values.answers_attributes[index].text === ''
                              ? 'Debes ingresar el texto de la respuesta'
                              : undefined
                          }
                        />
                        <div className={styles['actions']}>
                          <div
                            className={`${styles['checker']} ${
                              answer.correct ? styles['check'] : ''
                            }`}
                            onClick={() => {
                              if (singleSelection) {
                                values.answers_attributes.forEach(
                                  (answer, i) => {
                                    if (index === i) {
                                      setFieldValue(
                                        `answers_attributes[${index}].correct`,
                                        !answer.correct
                                      );
                                    } else {
                                      setFieldValue(
                                        `answers_attributes[${i}].correct`,
                                        false
                                      );
                                    }
                                  }
                                );
                              }
                              setFieldValue(
                                `answers_attributes[${index}].correct`,
                                !answer.correct
                              );
                            }}
                          >
                            <Icon icon="check" size={15} />
                          </div>
                          <div
                            className={styles['remove']}
                            onClick={() => remove(index)}
                          >
                            <Icon icon="trash" size={15} />
                          </div>
                        </div>
                      </div>
                    ))}
                    <div
                      className={styles['add-new']}
                      onClick={() =>
                        push({
                          text: '',
                          correct: false,
                          question_id: null,
                          id: null,
                        })
                      }
                    >
                      {t('quizFormMultipleOptions.addAnswer')}
                    </div>
                  </div>
                )}
              />
              <InputTextStatus
                status={StatusInputText.error}
                text={
                  typeof errors.answers_attributes === 'string'
                    ? errors.answers_attributes
                    : ''
                }
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
                title={
                  question?.question
                    ? t('buttons.updateQuestion')
                    : t('buttons.addQuestion')
                }
                color={ColorsButton.secondary}
                type={TypeButton.submit}
                onClick={submitForm}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default QuizFormMultipleOptions;
