import styles from './quiz-form-multiple-options.module.scss';
import Icon from '../icon/icon';
import Input from '../input/input';
import { generateAlphabet } from 'libs/api/src/lib/utils';
import Button, { ColorsButton, TypeButton } from '../button/button';
import { FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { QuestionQuiz, TypeQuestionQuiz } from '@ltpx-frontend-apps/api';
import { useEffect, useRef } from 'react';

/* eslint-disable-next-line */
export interface QuizFormMultipleOptionsProps {
  singleSelection?: boolean;
  onSubmit?: (data: QuestionQuiz) => void;
  className?: string;
  api?: any,
}

export function QuizFormMultipleOptions(props: QuizFormMultipleOptionsProps) {
  const { onSubmit, singleSelection, className, api } = props;
  const submitRef = useRef();

  useEffect(() => {
    console.log('QuizFormMultipleOptions')
    if(!!api) {
      const apiQuizMultiple = createPublicApi();
      api(apiQuizMultiple);
    }
    return () => {
    }
  }, [])


  function createPublicApi() {
    return {
      submitRef: submitRef,
    };
  }

  const alphabetLetters = generateAlphabet();

  return (
    <div className={styles['questions']}>
      <Formik
        initialValues={{
          question: '',
          description: '',
          kind: singleSelection ? TypeQuestionQuiz.single : TypeQuestionQuiz.multiple,
          answers: [
            {
              text: '',
              correct: false,
            },
          ],
        }}
        onSubmit={(values) => {
          onSubmit && onSubmit(values);
        }}
      >
        {({ values, handleChange, handleBlur, setFieldValue, submitForm }) => (
          <Form className={className || ''}>
            <div className={styles['fields']}>
              <Input
                label={`Pregunta`}
                name="question"
                placeholder="Formula tu pregunta"
                value={values.question}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Descripción (opcional)"
                name="description"
                placeholder="Alguna observación antes de responder esta pregunta"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br />
              <label>Respuestas</label>
              <FieldArray
                name="answers"
                render={(arrayHelpers) => (
                  <div>
                    {values.answers.map((answer, index) => (
                      <div className={`${styles['answer']} ${ singleSelection ? styles['single'] : ''}`} key={index}>
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
                                values.answers.forEach((answer, i)=>{
                                  if (index === i) {
                                    setFieldValue(
                                      `answers[${index}].correct`,
                                      !answer.correct
                                    );
                                  } else {
                                    setFieldValue(
                                      `answers[${i}].correct`,
                                      false
                                    );
                                  }
                                })
                              };
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
                      + Nueva respuesta
                    </div>
                  </div>
                )}
              />
            </div>
            <div className={styles['footer']}>
              <Button
                title="Guardar"
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
