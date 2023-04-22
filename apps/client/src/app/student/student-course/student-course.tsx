import {
  Button,
  CourseContents,
  CourseDateCard,
  ProgressBar,
  Tabs,
  useMoment,
} from '@ltpx-frontend-apps/shared-ui';
import { useChat, useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './student-course.module.scss';
import StudentCourseAchievements from './tabs/student-course-achievements/student-course-achievements';
import StudentCourseQuizzes from './tabs/student-course-quizzes/student-course-quizzes';
import StudentCourseTasks from './tabs/student-course-tasks/student-course-tasks';
import { Avatar } from 'evergreen-ui';

/* eslint-disable-next-line */
export interface StudentCourseProps {}

export function StudentCourse(props: StudentCourseProps) {
  const { _getStudentCourse, enrolledCourse } = useStudent();
  const [selectedTab, setSelectedTab] = useState(0);
  const { slug } = useParams();
  const [showMore, setShowMore] = useState(false);
  const { _newChatRoom, setShowChat } = useChat();
  const { customFormatDate, moment } = useMoment();

  const fetchCourse = useCallback(async () => {
    const { success, data, error } = await _getStudentCourse(slug || '');
    if (success) {
    } else {
    }
  }, []);

  useEffect(() => {
    fetchCourse();
  }, []);

  const tabs = [
    { text: 'Contenidos' },
    { text: 'Clases' },
    { text: 'Tareas' },
    { text: 'Tests' },
    { text: 'Logros' },
  ];

  const handleClick = (index: number) => {
    setSelectedTab(index);
  };

  const chatWithTeacher = async () => {
    if (enrolledCourse.teacher) {
      await _newChatRoom(enrolledCourse.teacher.user_id);
      setShowChat(true);
    }
  };

  return (
    <div className={styles['main-container']}>
      <div className={styles['container']}>
        <h1>Curso: {enrolledCourse.title}</h1>
        {enrolledCourse.description && (
          <p className={styles['about-course']}>
            {enrolledCourse.description.substring(0, 200)}
          </p>
        )}
        <div className={styles['columns-container']}>
          <div className={styles['column-left']}>
            <div
              className={`${styles['basic-card']} ${styles.center} ${styles['teacher-card']}`}
            >
              <Avatar src={enrolledCourse.teacher?.profile_image} size={100} />
              <h4>{enrolledCourse.teacher?.name}</h4>
              <h5>Profesor</h5>
              <Button
                title="Enviarle un mensaje"
                icon="chat"
                onClick={chatWithTeacher}
              />
            </div>
            <div className={`${styles['basic-card']} ${styles.center}`}>
              <h3>Que Aprenderás</h3>
              {enrolledCourse.learn_goals && (
                <h4>
                  {enrolledCourse.learn_goals.split('\n').map((goal) => (
                    <div className={styles['goals']}>
                      <div className={styles['square']}></div>
                      <h5>{goal}</h5>
                    </div>
                  ))}
                </h4>
              )}
            </div>
            <div className={`${styles['basic-card']}`}>
              <ProgressBar
                text="Completado"
                percentage={0}
                className={styles['progress-card']}
              />
            </div>
          </div>
          <div className={styles['column-right']}>
            <div className={styles['basic-cards']}>
              <Tabs
                tabs={tabs}
                isNav={false}
                onClickTab={(option) => handleClick(option)}
              />
              <div className={styles['tabs-content']}>
                {selectedTab === 0 && (
                  <div className={styles['contents-course']}>
                    {/* <h2 className={styles['title-content']}>Sobre el Curso</h2>
                    {enrolledCourse.description && (
                      <div>
                        {enrolledCourse.description.length > 800 ? (
                          <>
                            <p className={styles['about-course']}>
                              {showMore
                                ? enrolledCourse.description
                                : `${enrolledCourse.description.substring(
                                    0,
                                    800
                                  )}....`}
                            </p>
                            <div
                              className={styles['show']}
                              onClick={() => setShowMore(!showMore)}
                            >
                              <h4>
                                {showMore ? 'Mostrar menos' : 'Mostrar mas'}
                              </h4>
                            </div>
                          </>
                        ) : (
                          <p className={styles['about-course']}>
                            {enrolledCourse.description}
                          </p>
                        )}
                      </div>
                    )}
                    <h3 className={styles['subtitle-content']}>Contenidos</h3> */}
                    <CourseContents contents={enrolledCourse.contents || []} />
                  </div>
                )}
                {/* <p className={styles['about-course']}>
                {enrolledCourse.description}
              </p> */}
                {selectedTab === 1 && (
                  <div className={styles['course-date']}>
                    {enrolledCourse.session.meetings.map((meeting, index) => (
                      <CourseDateCard
                        className={styles['course-class']}
                        key={index}
                        size={true}
                        title={`Clase ${index + 1}: ${customFormatDate(
                          meeting.start_date,
                          'MMM D YYYY'
                        )}`}
                        description={`La clase tendrán una duración de ${enrolledCourse.session.call_time_min} min`}
                        time={`Hora de inicio: ${customFormatDate(
                          meeting.start_date,
                          'h:mm a'
                        )}`}
                      >
                        {meeting.meeting_id ? (
                          <Button
                            className={styles['btn-class']}
                            title={`Ir a Clase`}
                            full={true}
                            link={`/student/live-meeting/${meeting.id}/${meeting.meeting_id}`}
                          />
                        ) : (
                          <Button
                            className={styles['btn-class']}
                            title="No ha iniciado aun"
                            full={true}
                            outline={true}
                            disabled={true}
                          />
                        )}
                      </CourseDateCard>
                    ))}
                  </div>
                )}
                {selectedTab === 2 && (
                  <StudentCourseTasks courseId={enrolledCourse.id} />
                )}
                {selectedTab === 3 && (
                  <StudentCourseQuizzes courseId={enrolledCourse.id} />
                )}
                {selectedTab === 4 && (
                  <StudentCourseAchievements courseId={enrolledCourse.id} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCourse;
