import styles from './quiz-form-multiple-options.module.scss';
import Icon from '../icon/icon';
import Input from '../input/input';
import { generateAlphabet } from 'libs/api/src/lib/utils';
import Button, { ColorsButton, TypeButton } from '../button/button';
import { FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { QuestionQuiz, TypeQuestionQuiz } from '@ltpx-frontend-apps/api';
import { useTranslation } from 'react-i18next';

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
    answers_attributes: question?.answers || [
      {
        text: '',
        correct: false,
        question_id: -1, //TODO: remove this, currently fails due to QuestionQuiz interface needs ids
        id: -1
      },
      {
        text: '',
        correct: false,
        question_id: -1,
        id: -2
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
          <Form className={className || ''}>
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
              />
              <br />
              <label>{t('quizFormMultipleOptions.answer')}</label>
              <FieldArray
                name="answers"
                render={(arrayHelpers) => (
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
                          name={`answers[${index}].text`}
                          onChange={handleChange}
                        />
                        <div className={styles['actions']}>
                          <div
                            className={`${styles['checker']} ${
                              answer.correct ? styles['check'] : ''
                            }`}
                            onClick={() => {
                              if (singleSelection) {
                                values.answers_attributes.forEach((answer, i) => {
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
                                });
                              }
                              setFieldValue(
                                `answers[${index}].correct`,
                                !answer.correct
                              );
                            }}
                          >
                            <Icon icon="check" size={15} />
                          </div>
                          <div
                            className={styles['remove']}
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <Icon icon="trash" size={15} />
                          </div>
                        </div>
                      </div>
                    ))}
                    <div
                      className={styles['add-new']}
                      onClick={() =>
                        arrayHelpers.push({
                          text: '',
                          correct: false,
                        })
                      }
                    >
                      {t('quizFormMultipleOptions.addAnswer')}
                    </div>
                  </div>
                )}
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
