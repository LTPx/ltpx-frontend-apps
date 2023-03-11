import styles from './teacher-view-student.module.scss';
import { useCourseStudents } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import {
  AchievementModel,
  QuizResult,
  TaskStudent,
} from '@ltpx-frontend-apps/api';
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
  studentId: number;
}
export function TeacherViewStudent(props: TeacherViewStudentProps) {
  const { studentId } = props;
  const [quizzes, setQuizzes] = useState<QuizResult[]>([]);
  const [achievements, setAchievements] = useState<AchievementModel[]>([]);
  const [tasks, setTasks] = useState<TaskStudent[]>([]);
  const {
    _getStudentQuizzesByCourse,
    _getStudentAchievementsByCourse,
    _getStudentTasksByCourse,
  } = useCourseStudents();
  const [openModal, setOpenModal] = useState(false);
  const { courseId } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);

  const fetchQuizzes = useCallback(async (id: number) => {
    const course_id = parseInt(courseId || '');
    const { success, data, error } = await _getStudentQuizzesByCourse(
      course_id,
      id
    );
    if (success) {
      console.log('data y: ', data);
      setQuizzes(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  const fetchAchievements = useCallback(async (id: number) => {
    const course_id = parseInt(courseId || '');
    const { success, data, error } = await _getStudentAchievementsByCourse(
      course_id,
      id
    );
    if (success) {
      console.log('data y: ', data);
      setAchievements(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  const fetchTasks = useCallback(async (id: number) => {
    const course_id = parseInt(courseId || '');
    const { success, data, error } = await _getStudentTasksByCourse(
      course_id,
      id
    );
    if (success) {
      console.log('data: ', data);
      setTasks(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    if (selectedTab === 0) {
      fetchTasks(studentId);
    }
    if (selectedTab === 1) {
      fetchQuizzes(studentId);
    }
    if (selectedTab === 2) {
      fetchAchievements(studentId);
    }
  }, [studentId, selectedTab]);

  const tabs = [
    {
      text: 'Tareas',
    },
    {
      text: 'Test',
    },
    {
      text: 'Logros',
    },
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
          {tasks?.map((task, index) => (
            <TaskTeacherCard
              key={index}
              title={task.title || ''}
              description={task.description || ''}
            />
          ))}
        </div>
      )}
      {selectedTab === 1 && (
        <div className={styles['content']}>
          <h4 className={styles['subtitle']}>Test dados por el estudiante</h4>
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
      )}
      {selectedTab === 2 && (
        <div className={styles['achievements-student']}>
          {achievements.length > 0 &&
            achievements.map((achievement, index) => (
              <AchievementCard
                key={index}
                image={achievement.image}
                text={achievement.title}
              />
            ))}
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
