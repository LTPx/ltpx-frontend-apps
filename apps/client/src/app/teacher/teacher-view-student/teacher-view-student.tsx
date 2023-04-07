import styles from './teacher-view-student.module.scss';
import { useCourseStudents } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import {
  AchievementModel,
  QuizResult,
  TaskStudentResult,
} from '@ltpx-frontend-apps/api';
import {
  AchievementBadge,
  Button,
  EmptyState,
  QuizStudentCard,
  Tabs,
  TaskTeacherCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useParams } from 'react-router-dom';
import { Dialog } from 'evergreen-ui';
import TeacherReviewQuiz from '../teacher-review-quiz/teacher-review-quiz';
/* eslint-disable-next-line */
export interface TeacherViewStudentProps {
  studentId: number;
}
export function TeacherViewStudent(props: TeacherViewStudentProps) {
  const { studentId } = props;
  const [quizzes, setQuizzes] = useState<QuizResult[]>([]);
  const [achievements, setAchievements] = useState<AchievementModel[]>([]);
  const [studentTasks, setStudentTasks] = useState<TaskStudentResult[]>([]);
  const [openTest, setOpenTest] = useState(false);
  const [quizId, setQuzId] = useState(0);
  const {
    _getStudentQuizzesByCourse,
    _getStudentAchievementsByCourse,
    _getStudentTasksByCourse,
    _teacherGradeTask,
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
      setStudentTasks(data);
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

  async function handleGradeTask(
    comment: string,
    approved: boolean,
    studentTaskId: number
  ) {
    const { success, data, error } = await _teacherGradeTask(studentTaskId, {
      id: studentId,
      comments: [comment],
      approved,
    });
    if (success) {
      fetchTasks(studentId);
    } else {
      console.log(error);
    }
  }
  return (
    <div className={styles['container']}>
      <Tabs tabs={tabs} onClickTab={(option) => handleClick(option)} />
      {selectedTab === 0 && (
        <div>
          {studentTasks.length > 0 ? (
            <div className={styles['task-student']}>
              {studentTasks.map((studentTask, index) => (
                <div key={index}>
                  <TaskTeacherCard
                    title={studentTask.task.title || ''}
                    descriptionTask={studentTask.task.description || ''}
                    fileTeacher={studentTask.task.file_url}
                    answerStudent={studentTask.answer || ''}
                    fileStudent={studentTask.file_url}
                    approved={studentTask.approved}
                    comments={studentTask.comments}
                    onSubmit={(comment, approved) =>
                      handleGradeTask(comment, approved, studentTask.id)
                    }
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
                          onClick={() => {
                            setOpenTest(true);
                            setQuzId(quiz.id);
                          }}
                        />
                      </div>
                    </QuizStudentCard>
                  </div>
                ))}
              </div>
              {openTest && (
                <Dialog
                  isShown={openTest}
                  hasFooter={false}
                  hasHeader={false}
                  hasClose={true}
                  topOffset={20}
                  onCloseComplete={() => setOpenTest(false)}
                  width={'65vw'}
                >
                  <TeacherReviewQuiz
                    quizId={quizId}
                    close={() => setOpenTest(false)}
                  />
                </Dialog>
              )}
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
                <div className={styles['achievements']} key={index}>
                  <AchievementBadge
                    title={achievement.title}
                    image={achievement.image}
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
