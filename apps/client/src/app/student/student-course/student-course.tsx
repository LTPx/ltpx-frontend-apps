import {
  Button,
  ColorsButton,
  CourseContents,
  InformationBox,
  ProgressBar,
  Tabs,
} from '@ltpx-frontend-apps/shared-ui';
import { useChat, useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './student-course.module.scss';
import StudentCourseAchievements from './tabs/student-course-achievements/student-course-achievements';
import StudentCourseQuizzes from './tabs/student-course-quizzes/student-course-quizzes';
import StudentCourseTasks from './tabs/student-course-tasks/student-course-tasks';
import { Avatar } from 'evergreen-ui';
import { useSearchParams } from 'react-router-dom';
import StudentCourseClasses from './tabs/student-course-classes/student-course-classes';
/* eslint-disable-next-line */
export interface StudentCourseProps {}

export function StudentCourse(props: StudentCourseProps) {
  const { _getStudentCourse, enrolledCourse } = useStudent();
  const tabs = [
    { text: 'Contenidos', value: 'contents' },
    { text: 'Clases', value: 'classes' },
    { text: 'Tareas', value: 'tasks' },
    { text: 'Tests', value: 'quizzes' },
    { text: 'Logros', value: 'achievements' },
  ];
  const { slug } = useParams();
  const { _newChatRoom, setShowChat } = useChat();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');
  const tabIndex = tabs.findIndex((item) => item.value === tab);
  const initialTabSelectedIndex = tabIndex > 0 ? tabIndex : 0;
  const [selectedTab, setSelectedTab] = useState(initialTabSelectedIndex);
  const [showMore, setShowMore] = useState(false);
  const [completeCourse, setCompleteCourse] = useState(false);

  const fetchCourse = useCallback(async () => {
    const { success, data, error } = await _getStudentCourse(slug || '');
    if (success) {
      console.log(success);
    } else {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchCourse();
  }, []);

  const handleClick = (index: number) => {
    setSelectedTab(index);
    // setCompleteCourse(true);
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
          <>
            {enrolledCourse.description.length > 280 ? (
              <>
                <p className={styles['about-course']}>
                  {showMore
                    ? enrolledCourse.description
                    : `${enrolledCourse.description.substring(0, 280)}....`}
                </p>
                <p
                  className={styles['show']}
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? 'Mostrar menos' : 'Mostrar mas'}
                </p>
              </>
            ) : (
              <p className={styles['about-course']}>
                {enrolledCourse.description}
              </p>
            )}
          </>
        )}
        {/* <CourseCertificate
          imageStudent={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPf84rgOXXF7qUrqIFpde-ntEleF8R1FeQyw&usqp=CAU'
          }
          teacherName={enrolledCourse.teacher?.teacher_name || ''}
          titleCourse={enrolledCourse.title}
          achievements={enrolledCourse.}
          totalTask={10}
          totalQuizzes={20}
          date={'23 de Junio, 2023'}
        /> */}
        <div className={styles['columns-container']}>
          <div className={styles['column-left']}>
            <div
              className={`${styles['basic-card']} ${styles.center} ${styles['teacher-card']}`}
            >
              <Avatar src={enrolledCourse.teacher?.profile_image} size={100} />
              <h4>{enrolledCourse.teacher?.teacher_name}</h4>
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
                <div className={styles['wrap-goals']}>
                  {enrolledCourse.learn_goals.split('\n').map((goal, key) => (
                    <div className={styles['goals']} key={key}>
                      <div className={styles['square']}></div>
                      <h5>{goal}</h5>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={`${styles['basic-card']}`}>
              <ProgressBar
                text="Completado"
                percentage={enrolledCourse.course_progress}
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
                indexTabSelected={selectedTab}
              />
              <div className={styles['tabs-content']}>
                {selectedTab === 0 && (
                  <div className={styles['contents-course']}>
                    <CourseContents contents={enrolledCourse.contents || []} />
                  </div>
                )}
                {selectedTab === 1 && (
                  <StudentCourseClasses session={enrolledCourse.session} />
                )}
                {selectedTab === 2 && enrolledCourse.id && (
                  <StudentCourseTasks courseId={enrolledCourse.id} />
                )}
                {selectedTab === 3 && enrolledCourse.id && (
                  <StudentCourseQuizzes courseId={enrolledCourse.id} />
                )}
                {selectedTab === 4 && enrolledCourse.id && (
                  <StudentCourseAchievements courseId={enrolledCourse.id} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <InformationBox
        title={'Haz alcanzado el 100% del curso'}
        description={'Puedes revisar tu certificado en este'}
        onClose={() => setCompleteCourse(false)}
        open={completeCourse}
        link={'/student/dashboard'}
        img="https://formacionespecializada.puce.edu.ec/wp-content/uploads/2022/06/grafico-educacion-continua.png"
      >
        <div className={styles['btn-action']}>
          <Button
            title={'Ir al dashboard'}
            color={ColorsButton.secondary}
            outline={true}
            link={'/student/dashboard'}
          />
        </div>
      </InformationBox> */}
    </div>
  );
}

export default StudentCourse;
