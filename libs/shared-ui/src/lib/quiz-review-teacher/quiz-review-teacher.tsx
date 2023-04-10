import styles from './quiz-review-teacher.module.scss';
import { QuizModel, TypeQuestionQuiz } from '@ltpx-frontend-apps/api';
import Button, { ColorsButton, TypeButton } from '../button/button';
import TextArea from '../text-area/text-area';
import { ReactElement, useState } from 'react';
import { useCourseUtil } from '@ltpx-frontend-apps/store';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMoment } from '../../hooks/useMoment';

/* eslint-disable-next-line */
export interface QuizReviewTeacherProps {
  quiz: QuizModel;
  score: number;
  submittedAt: string;
  onClose?: () => void;
  hideHeader?: boolean;
  userAnswers: {
    answer_id: number;
    id: number;
    text?: string;
    correct?: boolean;
  }[];
  children?: ReactElement;
}

export function QuizReviewTeacher(props: QuizReviewTeacherProps) {
  const {
    quiz,
    userAnswers,
    score,
    submittedAt,
    children,
    onClose,
    hideHeader,
  } = props;
  const [style, setStyle] = useState('answer-content');
  const answersIds = userAnswers.map((answer) => answer.answer_id);
  const foundAnswer = (answerId: number) => {
    return userAnswers.find((answer) => answer.answer_id == answerId);
  };
  const { translateOption } = useCourseUtil();
  const { formatDate } = useMoment();

  const formik = useFormik({
    initialValues: {
      answers: userAnswers || [],
      feedback: '',
    },
    validationSchema: Yup.object({
      feedback: Yup.mixed().required('Agrega feedback por favor'),
    }),
    onSubmit: async (formData) => {
      console.log('formData: ', formData);
    },
  });

  const setAnswer = (valid: boolean, answerId: number) => {
    const index = userAnswers.findIndex((answer)=> answer.answer_id === answerId);
    formik.setFieldValue(`answers[${index}].correct`, valid);
  };

  return (
    <div className={styles['container']}>
      {quiz.id && (
        <div className={`${styles['quiz-container']}`}>
          {!!!hideHeader && (
            <div className={styles['header']}>
              <h2>Test: {quiz.name}</h2>
              <h4>Enviado: {formatDate(submittedAt)}</h4>
            </div>
          )}
          <div className={styles['content']}>
            <div className={styles['questions']}>
              {quiz.questions_attributes.map((question, index) => (
                <div className="question" key={index}>
                  {question.kind === TypeQuestionQuiz.conditional && (
                    <>
                      <h3 className={styles['question-text']}>
                        {index + 1}. {question.question}
                      </h3>
                      <p>{question.description}</p>
                      <div className={styles['items']}>
                        {question.answers_attributes.map((answer, i) => (
                          <p
                            key={i}
                            className={`${styles['question-answer']} ${
                              answersIds.includes(answer.id || -1)
                                ? styles['selected']
                                : ''
                            }`}
                          >
                            {translateOption(answer.text)}
                          </p>
                        ))}
                      </div>
                    </>
                  )}
                  {question.kind === TypeQuestionQuiz.multiple && (
                    <>
                      <h3 className={styles['question-text']}>
                        {index + 1}. {question.question}
                      </h3>
                      <p>{question.description}</p>
                      <div className={styles['items']}>
                        {question.answers_attributes.map((answer, i) => (
                          <p
                            key={i}
                            className={`${styles['question-answer']} ${
                              answersIds.includes(answer.id || -1)
                                ? styles['selected']
                                : ''
                            }`}
                          >
                            {answer.text}
                          </p>
                        ))}
                      </div>
                    </>
                  )}
                  {question.kind === TypeQuestionQuiz.single && (
                    <>
                      <h3 className={styles['question-text']}>
                        {index + 1}. {question.question}
                      </h3>
                      <p>{question.description}</p>
                      <div className={styles['items']}>
                        {question.answers_attributes.map((answer, i) => (
                          <p
                            key={i}
                            className={`${styles['question-answer']} ${
                              answersIds.includes(answer.id || -1)
                                ? styles['selected']
                                : ''
                            }`}
                          >
                            {answer.text}
                          </p>
                        ))}
                      </div>
                    </>
                  )}
                  {question.kind === TypeQuestionQuiz.answer && (
                    <div className={styles['answer']}>
                      <div>
                        <h3 className={styles['question-text']}>
                          {index + 1}. {question.question}
                        </h3>
                        <p>{question.description}</p>
                        {question.answers_attributes.map((answer, indexAnswer) => (
                          <>
                            <pre className={styles[style]} key={indexAnswer}>
                              {foundAnswer(answer.id)?.text}
                            </pre>
                            <div className={styles['buttons-rate']}>
                              <Button
                                className={styles['btn-correct']}
                                title={`Es incorrecto`}
                                icon="close"
                                color={ColorsButton.secondary}
                                outline={true}
                                onClick={() => {
                                  setAnswer(false, answer.id);
                                }}
                              />
                              <Button
                                className={styles['btn-correct']}
                                title="La respuesta es correcta"
                                icon="check"
                                color={ColorsButton.primary}
                                outline={true}
                                onClick={() => {
                                  setAnswer(true, answer.id);
                                }}
                              />
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles['feedback']}>
            <TextArea
              label="Observaciones Generales"
              description="Puedes agregar feedback en caso que el estudiante tenga un resultado negativo 😐 o felicitar al estudiante por alcanzar una nota alta 😃"
              name="feedback"
              onChange={formik.handleChange}
              rows={6}
              errorMessage={formik.errors.feedback}
            />
          </div>
          <div className={styles['footer']}>
            <Button
              title="Cancelar"
              color={ColorsButton.white}
              onClick={onClose}
            />
            <Button
              title="Guardar"
              color={ColorsButton.primary}
              type={TypeButton.submit}
              onClick={formik.submitForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizReviewTeacher;
