import styles from './student-course-quizzes.module.scss';
import { QuizStudent } from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  ColorsTag,
  QuizStudentCard,
  Tag,
} from '@ltpx-frontend-apps/shared-ui';
import { useStudent } from '@ltpx-frontend-apps/store';
import { Dialog } from 'evergreen-ui';
import { useCallback, useEffect, useState } from 'react';
import StudentReviewQuiz from '../../../student-review-quiz/student-review-quiz';

/* eslint-disable-next-line */
export interface StudentCourseQuizzesProps {
  courseId: number;
  // slug: string;
}

export function StudentCourseQuizzes(props: StudentCourseQuizzesProps) {
  const { courseId } = props;
  const [quizzes, setQuizzes] = useState<QuizStudent[]>([]);
  const { _getStudentQuizzes } = useStudent();
  const [openTest, setOpenTest] = useState(false);
  const [quizSelected, setQuizSelected] = useState<QuizStudent>();

  const fetchQuizzes = useCallback(async () => {
    const { success, data, error } = await _getStudentQuizzes(courseId);
    if (success) {
      console.log('data: ', data);
      setQuizzes(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className={styles['container']}>
      {quizzes?.map((quiz, index) => (
        <div key={index}>
          <QuizStudentCard
            title={quiz.name}
            totalQuestions={quiz.total_questions}
            score={
              quiz.last_quiz_result ? quiz.last_quiz_result.score : undefined
            }
            statusTest={
              quiz.last_quiz_result ? quiz.last_quiz_result.in_review : false
            }
            attempts={quiz.max_attempts || undefined}
            date={quiz.last_quiz_result ? quiz.last_quiz_result.created_at : ''}
            approved={
              quiz.last_quiz_result
                ? quiz.last_quiz_result.score >= quiz.approve_score
                : false
            }
            feedback={
              quiz.last_quiz_result ? quiz.last_quiz_result.feedback : undefined
            }
            approveScore={quiz.approve_score}
          >
            <>
              {quiz.quizzes_results_ids.length === 0 && (
                <Button
                  className={styles['btn-task-form']}
                  title="Empezar test"
                  icon="play-filled"
                  link={`/student/course/${courseId}/quiz/${quiz.id}`}
                />
              )}
              {quiz.last_quiz_result && (
                <div className="result">
                  {quiz.last_quiz_result.in_review && (
                    <Tag
                      className={styles['tag-review']}
                      icon={'clock'}
                      text={'En revision'}
                      color={ColorsTag.blue}
                    />
                  )}
                  {quiz.last_quiz_result.score >= quiz.approve_score &&
                    !quiz.last_quiz_result.in_review && (
                      <Button
                        className={styles['btn-task-form']}
                        color={ColorsButton.secondary}
                        title="Mis respuestas"
                        outline={true}
                        icon="eye"
                        onClick={() => {
                          setOpenTest(true);
                          setQuizSelected(quiz);
                        }}
                        // link={`/student/course/${courseId}/quiz-review/${quiz.last_quiz_result.id}`}
                      />
                    )}
                  {quiz.last_quiz_result.score < quiz.approve_score &&
                    !quiz.last_quiz_result.in_review && (
                      <Button
                        className={styles['btn-task-form']}
                        // color={ColorsButton.secondary}
                        title="Volver a Intentar"
                        icon="undo"
                        link={`/student/course/${courseId}/quiz/${quiz.id}`}
                      />
                    )}
                </div>
              )}
            </>
          </QuizStudentCard>
        </div>
      ))}
      <Dialog
        isShown={openTest}
        hasClose={true}
        hasFooter={false}
        title={
          quizSelected &&
          quizSelected.name +
            ' ' +
            quizSelected.last_quiz_result.score +
            ' / 100'
        }
        onCloseComplete={() => setOpenTest(false)}
        width={'55vw'}
      >
        <StudentReviewQuiz
          quizId={(quizSelected && quizSelected.last_quiz_result.id) || 0}
          onClose={() => setOpenTest(false)}
        />
      </Dialog>
    </div>
  );
}

export default StudentCourseQuizzes;
