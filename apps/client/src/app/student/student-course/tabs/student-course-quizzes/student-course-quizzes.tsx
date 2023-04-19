import styles from './student-course-quizzes.module.scss';
import { QuizStudent } from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  QuizStudentCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface StudentCourseQuizzesProps {
  courseId: number;
  // slug: string;
}

export function StudentCourseQuizzes(props: StudentCourseQuizzesProps) {
  const { courseId } = props;
  const [quizzes, setQuizzes] = useState<QuizStudent[]>([]);
  const { _getStudentQuizzes } = useStudent();

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
            attempts={quiz.max_attempts || undefined}
            date={quiz.last_quiz_result ? quiz.last_quiz_result.created_at : ""}
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
                  {quiz.last_quiz_result.in_review && <h5>En revision</h5>}
                  {quiz.last_quiz_result.score >= quiz.approve_score &&
                    !quiz.last_quiz_result.in_review && (
                      <Button
                      className={styles['btn-task-form']}
                        color={ColorsButton.secondary}
                        title="Mis respuestas"
                        outline={true}
                        icon="eye"
                        link={`/student/course/${courseId}/quiz-review/${quiz.last_quiz_result.id}`}
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
    </div>
  );
}

export default StudentCourseQuizzes;
