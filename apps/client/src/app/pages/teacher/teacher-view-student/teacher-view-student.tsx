import styles from './teacher-view-student.module.scss';
import { useCourseStudents } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { QuizResult } from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  QuizStudentCard,
  TextArea,
} from '@ltpx-frontend-apps/shared-ui';
import { Dialog } from 'evergreen-ui';
import { useParams } from 'react-router-dom';
/* eslint-disable-next-line */
export interface TeacherViewStudentProps {
  courseId?: number;
}
export function TeacherViewStudent(props: TeacherViewStudentProps) {
  const [quizzes, setQuizzes] = useState<QuizResult[]>([]);
  const { _getStudentQuizzesByCourse } = useCourseStudents();
  const [openModal, setOpenModal] = useState(false);
  const { courseId, studentId } = useParams();

  const fetchCourse = useCallback(async () => {
    const course_id = parseInt(courseId || '');
    const student_id = parseInt(studentId || '');
    const { success, data, error } = await _getStudentQuizzesByCourse(course_id, student_id);
    if (success) {
      console.log('data: ', data);
      setQuizzes(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <h3 className={styles['subtitle']}>Test dados por el estudiante</h3>
        <div className={styles['quizzes-content']}>
          {quizzes?.map((quiz, index) => (
            <div key={index}>
              <QuizStudentCard
                title={quiz.name}
                text={`Resultado: ${quiz.score}`}
              >
                <div className={styles['btn-test']}>
                  <Button
                    title="Calificar test"
                    icon="play-filled"
                    link={`/teacher/quiz-review/${quiz.id}`}
                  />
                  <Button
                    title="Dar Feedback"
                    color={ColorsButton.secondary}
                    icon="play-filled"
                    onClick={() => setOpenModal(true)}
                  />
                </div>
              </QuizStudentCard>
            </div>
          ))}
        </div>
      </div>
      <Dialog
        isShown={openModal}
        hasFooter={false}
        title="Feedback"
        onCloseComplete={() => setOpenModal(false)}
        width={'40vw'}
      >
        <div className={styles['feedback']}>
          <div className={styles['content-feed']}>
            <TextArea className={styles['text-area']} rows={8} />
          </div>
          <div className={styles['footer']}>
            <Button
              color={ColorsButton.white}
              onClick={() => {
                setOpenModal(false);
              }}
              title={'Cancelar'}
            />
            <Button title={'Enviar'} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default TeacherViewStudent;
