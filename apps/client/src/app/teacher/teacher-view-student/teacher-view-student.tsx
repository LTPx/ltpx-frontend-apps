import styles from './teacher-view-student.module.scss';
import { useCourseStudents } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import {
  AchievementModel,
  CourseModel,
  QuizResult,
  TaskStudent,
} from '@ltpx-frontend-apps/api';
import {
  AchievementCard,
  Button,
  ColorsButton,
  EmptyState,
  QuizStudentCard,
  Tabs,
  TaskTeacherCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useParams } from 'react-router-dom';
/* eslint-disable-next-line */
export interface TeacherViewStudentProps {
  studentId: number;
}
export function TeacherViewStudent(props: TeacherViewStudentProps) {
  const { studentId } = props;
  const [quizzes, setQuizzes] = useState<QuizResult[]>([]);
  const [course, setCourse] = useState<CourseModel[]>([]);
  const [achievements, setAchievements] = useState<AchievementModel[]>([]);
  const [tasks, setTasks] = useState<TaskStudent[]>([]);
  const {
    _getStudentsByCourse,
    _getStudentQuizzesByCourse,
    _getStudentAchievementsByCourse,
    _getStudentTasksByCourse,
  } = useCourseStudents();
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
        <div>
          {tasks.length > 0 ? (
            <div className={styles['task-student']}>
              {tasks.map((task, index) => (
                <div key={index}>
                  {/* <h4 className={styles['title-task']}>
                    Tareas del estudiante:{' '}{courseId}
                  </h4> */}
                  <TaskTeacherCard
                    title={task.title || ''}
                    description={task.description || ''}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              classNameImage={`${styles['image-empty']}`}
              className={`${styles['image-content']}`}
              icon={'task-outline'}
              description={'El estudiante aun no a completado una tarea'}
            />
          )}
        </div>
      )}
      {selectedTab === 1 && (
        <div>
          {quizzes.length > 0 ? (
            <div className={styles['content']}>
              {/* <h4 className={styles['subtitle']}>
                Test dados por el estudiante
              </h4> */}
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
                          target={true}
                          link={`/teacher/quiz-review/${quiz.id}`}
                        />
                      </div>
                    </QuizStudentCard>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <EmptyState
              classNameImage={`${styles['image-empty']}`}
              className={`${styles['image-content']}`}
              icon={'quiz-outline'}
              description={'El estudiante aun no a completado un test.'}
            />
          )}
        </div>
      )}
      {selectedTab === 2 && (
        <div className={styles['achievements-student']}>
          {achievements.length > 0 ? (
            <div className={styles['achievements-content']}>
              {achievements?.map((achievement, index) => (
                <div className={styles['achievements']}  key={index}>
                  <AchievementCard
                    image={achievement.image}
                    text={achievement.title}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              classNameImage={`${styles['image-empty']}`}
              className={`${styles['image-content']}`}
              icon={'trophy-outline'}
              description={'El estudiante aun no a alcanzado un logro. '}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default TeacherViewStudent;
