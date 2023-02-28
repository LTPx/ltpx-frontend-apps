import { TypeQuestionQuiz, UserAnswer } from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  QuizAnswerQuestion,
  QuizConditionalQuestion,
  QuizMultiselectQuestion,
  QuizScore,
} from '@ltpx-frontend-apps/shared-ui';
import { useStudent, useUser } from '@ltpx-frontend-apps/store';
import { Dialog } from 'evergreen-ui';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './student-quiz.module.scss';

/* eslint-disable-next-line */
export interface StudentQuizProps {}

export function StudentQuiz(props: StudentQuizProps) {
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const { _getStudentQuiz, _evaluateQuiz, currentQuiz } = useStudent();
  const params = useParams();
  const { quizId, courseId } = params;
  const id = parseInt(quizId || '');
  const course_id = parseInt(courseId || '');

  const [openModal, setOpenModal] = useState(false);
  const [score, setScore] = useState<number>(0);
  const { user } = useUser();

  const uniqueIds: number[] = [];
  const filterAnswers = (answers: UserAnswer[]) => {
    return answers.filter(element => {
      const id = element.answer_id;
      const isDuplicate = uniqueIds.includes(id);
      if (!isDuplicate) {
        uniqueIds.push(id);
        return true;
      }
      return false;
    });
  }


  const handleRequest = async() => {
    console.log('answers: ', answers);
    const answersFilter = filterAnswers(answers).map((answer)=> {
      return {...answer, ...{user_id: user.id}};
    });
    console.log(answersFilter);
    const { data, success, error } = await _evaluateQuiz(id, answersFilter);
    if(success) {
      setScore(data.score);
      setOpenModal(true);
    } else {
      console.log(error);
    }
  };

  const fetchQuiz = useCallback(async () => {
    const { success, data, error } = await _getStudentQuiz(course_id, id);
    if (success) {
      console.log('data: ', data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <div className={styles['container']}>
      {currentQuiz.id && (
        <div className={`${styles['quiz-container']} card with-padding`}>
          <div className={styles['header']}>
            <h1>{currentQuiz.name}</h1>
            <div className={styles['progress-quiz']}>
              <p>Total de Preguntas</p>
              <h3>{currentQuiz.questions.length}</h3>
            </div>
          </div>
          <div className={styles['content']}>
            <div className={styles['questions']}>
              {currentQuiz.questions.map((question, index) => (
                <div className="question" key={index}>
                  {question.kind === TypeQuestionQuiz.conditional && (
                    <QuizConditionalQuestion
                      title={question.question}
                      description={question.description}
                      answers={question.answers}
                      onChange={(answerSelected)=>{
                        setAnswers(answers.concat([answerSelected]));
                      }}
                    />
                  )}
                  {question.kind === TypeQuestionQuiz.multiple && (
                    <QuizMultiselectQuestion
                      title={question.question}
                      description={question.description}
                      answers={question.answers}
                      multiple={true}
                      onChange={(answersSelected)=>{
                        setAnswers(answers.concat(answersSelected));
                      }}
                    />
                  )}
                  {question.kind === TypeQuestionQuiz.single && (
                    <QuizMultiselectQuestion
                      title={question.question}
                      description={question.description}
                      answers={question.answers}
                      multiple={false}
                      onChange={(answersSelected)=>{
                        console.log(answersSelected);
                        setAnswers(answers.concat(answersSelected));
                      }}
                    />
                  )}
                  {question.kind === TypeQuestionQuiz.answer && (
                    <QuizAnswerQuestion
                      title={question.question}
                      description={question.description}
                    />
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
              onClick={() => {
                handleRequest();
              }}
            />
          </div>
        </div>
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
