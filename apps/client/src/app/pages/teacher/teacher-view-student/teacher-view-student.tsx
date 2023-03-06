import styles from './teacher-view-student.module.scss';
import { useCourseStudents } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { QuizResult } from '@ltpx-frontend-apps/api';
import {
  AchievementCard,
  Button,
  ColorsButton,
  QuizStudentCard,
  Tabs,
  TaskTeacherCard,
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
  const [selectedTab, setSelectedTab] = useState(0);

  const fetchCourse = useCallback(async () => {
    const course_id = parseInt(courseId || '');
    const student_id = parseInt(studentId || '');
    const { success, data, error } = await _getStudentQuizzesByCourse(
      course_id,
      student_id
    );
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

  const tabs = [
    {
      text: 'Tareas',
    },
    {
      text: 'Test',
    },
    {
      text: 'Logros',
    }
  ];
  const handleClick = (index: number) => {
    setSelectedTab(index);
  };
  return (
    <div className={styles['container']}>
      <Tabs tabs={tabs} onClickTab={(option) => handleClick(option)} />
      {selectedTab === 0 && (
        <div className={styles['task-student']}>
          <h4 className={styles['title-task']}>Tareas del estudiante: </h4>
          <TaskTeacherCard title={'Matemáticas'} description={'entregada'} />
        </div>
      )}
      {selectedTab === 1 && (
        <div className={styles['content']}>
          <h4 className={styles['subtitle']}>Test dados por el estudiante</h4>
          <div className={styles['quizzes-content']}>
            {quizzes?.map((quiz, index) => (
              <div key={index}>
                <QuizStudentCard title={quiz.name} text={`Resultado: ${quiz.score}`}>
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
      )}
      {selectedTab === 2 && (
        <div className={styles['achievements-student']}>
          <AchievementCard image={''} text={''}/>
        </div>
      )}
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
