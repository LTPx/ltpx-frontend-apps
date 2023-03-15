import styles from './student-quiz.module.scss';
import {
  QuestionQuiz,
  TypeQuestionQuiz,
} from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  QuizConditionalQuestion,
  QuizMultiselectQuestion,
  QuizScore,
  TextArea,
  TypeButton,
} from '@ltpx-frontend-apps/shared-ui';
import { useStudent } from '@ltpx-frontend-apps/store';
import { Dialog } from 'evergreen-ui';
import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function StudentQuiz() {
  const [answersForm, setAnswersForm] = useState({
    answers: [{ question: '', answers: [] }],
  });
  const [loaded, setLoaded] = useState(false);
  const { _getStudentQuiz, _evaluateQuiz, currentQuiz } = useStudent();
  const { quizId, courseId } = useParams();
  const id = parseInt(quizId || '');
  const course_id = parseInt(courseId || '');

  const [openModal, setOpenModal] = useState(false);
  const [score, setScore] = useState<number>(0);

  const fetchQuiz = useCallback(async () => {
    const { success, data, error } = await _getStudentQuiz(course_id, id);
    if (success) {
      const answers = data.questions.map((question: QuestionQuiz) => {
        return {
          question: question.question,
          answers: [],
        };
      });
      console.log('data quiz: ', data);
      console.log('data answers: ', answers);
      setLoaded(true);
      setAnswersForm({ answers });
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const formik = useFormik({
    initialValues: answersForm,
    enableReinitialize: true,
    onSubmit: async (fields) => {
      console.log(fields);
      const { answers } = fields;
      const answersFilter = answers.reduce(
        (userAnswers: any[], question: any) => {
          return userAnswers.concat(question.answers_attributes);
        },
        []
      );
      const { data, success, error } = await _evaluateQuiz(id, answersFilter);
      if (success) {
        setScore(data.score);
        setOpenModal(true);
      } else {
        console.log(error);
      }
    },
  });

  return (
    <div className={styles['container']}>
      {loaded && (
        <form className={`${styles['quiz-container']} card`}>
          <div className={styles['header']}>
            <h1>{currentQuiz.name}</h1>
            <div className={styles['progress-quiz']}>
              {/* <p>Total de Preguntas</p>
              <h3>{currentQuiz.questions.length}</h3> */}
            </div>
          </div>
          <div className={styles['content']}>
            <div className={styles['questions']}>
              {currentQuiz.questions_attributes.map((question, index) => (
                <div className="question" key={index}>
                  {question.kind === TypeQuestionQuiz.conditional && (
                    <QuizConditionalQuestion
                      number={index+1}
                      title={question.question}
                      description={question.description}
                      answers={question.answers_attributes}
                      onChange={(answerSelected) => {
                        formik.setFieldValue(`answers[${index}].answers`, [
                          answerSelected,
                        ]);
                      }}
                    />
                  )}
                  {question.kind === TypeQuestionQuiz.multiple && (
                    <QuizMultiselectQuestion
                      number={index+1}
                      title={question.question}
                      description={question.description}
                      answers={question.answers_attributes}
                      multiple={true}
                      onChange={(answersSelected) => {
                        formik.setFieldValue(
                          `answers[${index}].answers`,
                          answersSelected
                        );
                      }}
                    />
                  )}
                  {question.kind === TypeQuestionQuiz.single && (
                    <QuizMultiselectQuestion
                      number={index+1}
                      title={question.question}
                      description={question.description}
                      answers={question.answers_attributes}
                      multiple={false}
                      onChange={(answersSelected) => {
                        formik.setFieldValue(
                          `answers[${index}].answers`,
                          answersSelected
                        );
                      }}
                    />
                  )}
                  {question.kind === TypeQuestionQuiz.answer && (
                    <div className={styles['question']}>
                      <h3>{index+1}. {question.question}</h3>
                      <TextArea
                        placeholder="Escribe tu respuesta"
                        rows={8}
                        name={`answers[${index}].answers`}
                        onChange={(e: any) => {
                          const text = e.target.value;
                          formik.setFieldValue(`answers[${index}].answers`, [
                            {
                              // answer_id: question.answers_attributes[0].id,
                              // question_id: question.answers_attributes[0].question_id,
                              // text,
                            },
                          ]);
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles['footer']}>
            <Button
              title="Cancelar"
              color={ColorsButton.white}
              outline={true}
              link={`/student/courses/${courseId}`}
            />
            <Button
              title="Finalizar test"
              type={TypeButton.submit}
              onClick={formik.handleSubmit}
            />
          </div>
        </form>
      )}
      <Dialog
        isShown={openModal}
        hasFooter={false}
        hasHeader={false}
        onCloseComplete={() => setOpenModal(false)}
        width={'30vw'}
      >
        <QuizScore
          totalScore={score}
          message={'Felicitaciones'}
          img={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR83K5rBkgtaRL7Or_WNwxAzS_wy-8DaGDMKA&usqp=CAU'
          }
        >
          <div className={styles['btn-quiz-score']}>
            <Button
              title={'Regresar'}
              color={ColorsButton.secondary}
              link={`/student/dashboard`}
            />
          </div>
        </QuizScore>
      </Dialog>
    </div>
  );
}

export default StudentQuiz;
