import { CourseStatus } from '@ltpx-frontend-apps/api';
import {
  AchievementsList,
  Button,
  ColorsButton,
  CourseContents,
  CourseDateCard,
  OverviewCourse,
  QuizzesList,
  Snackbar,
  SnackbarPosition,
  SnackbarType,
  Tabs,
  TextArea,
} from '@ltpx-frontend-apps/shared-ui';
import { useAdmin, useCourseUtil } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './course-details-page.module.scss';
import { Dialog } from 'evergreen-ui';

export function CourseDetailsPage() {
  const [error, setError] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const { viewCourse, _getCourse, _approveCourse } = useAdmin();
  const { translateCategory, translateLanguage, translateLevel } =
    useCourseUtil();
  const { classroom, quizzes, contents, achievements, session, tasks } =
    viewCourse;
  const params = useParams();
  const { id } = params;
  const courseId = parseInt(id || '');
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const tabs = [
    { text: 'Detalles' },
    { text: 'Contenidos' },
    { text: 'Tareas' },
    { text: 'Test' },
    { text: 'Logros' },
    { text: 'Sesiones' },
  ];

  const fetchData = useCallback(async () => {
    const resp = await _getCourse(courseId);
    console.log('viewCourse....: ', resp);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleApproveCourse = async () => {
    const { success, error } = await _approveCourse(viewCourse.id);
    if (success) {
      console.log('approved');
      navigate('/admin/courses');
    } else {
      setError(true);
      console.log('error: ', error);
    }
  };

  const handleRequestChange = () => {
    setOpenModal(true);
  };

  return (
    <div className={styles['container']}>
      {viewCourse.id && (
        <div className="c">
          <div className={styles['header']}>
            <h1>{viewCourse.title}</h1>
            {viewCourse.status === CourseStatus.review && (
              <div className={styles['actions']}>
                <Button
                  title="Requiere cambios"
                  color={ColorsButton.secondary}
                  outline={true}
                  onClick={() => {
                    handleRequestChange();
                  }}
                />
                <Button
                  title="Aprobar curso"
                  onClick={() => {
                    handleApproveCourse();
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <div className={styles['cover']}>
              <img src={viewCourse.cover_url}></img>
            </div>
            <div className={styles['basic-info']}>
              <span className={`${styles['noted']}`}>
                {translateCategory(viewCourse.category)}
              </span>
              <span className={`${styles['noted']}`}>
                {translateLevel(viewCourse.level)}
              </span>
              <span className={`${styles['noted']}`}>
                {translateLanguage(viewCourse.language)}
              </span>
            </div>
            <Tabs
              tabs={tabs}
              isNav={false}
              onClickTab={(index) => setSelectedTab(index)}
            />
            <div className={styles['course-content']}>
              {selectedTab === 0 && (
                <OverviewCourse
                  description={viewCourse.description}
                  goals={
                    viewCourse.learn_goals
                      ? viewCourse.learn_goals?.split('\n')
                      : []
                  }
                  requirements={
                    viewCourse.requirements
                      ? viewCourse.requirements.split('\n')
                      : []
                  }
                />
              )}
              {selectedTab === 1 && (
                <CourseContents contents={contents || []} />
              )}
              {selectedTab === 2 && (
                <div className={styles['task']}>
                  {tasks.map((task, index) => (
                    <div className={styles['task-content']} key={index}>
                      <h4 className={styles['title-task']}>{task.title}</h4>
                      <h4 className={styles['description-task']}>
                        {task.description}
                      </h4>
                      {task.file_url && (
                        <a href={task.file_url} target="blank_">
                          Archivo Adjunto
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {selectedTab === 3 && <QuizzesList quizzes={quizzes || []} />}
              {selectedTab === 4 && (
                <AchievementsList achievements={achievements || []} />
              )}
              {selectedTab === 5 && classroom && (
                <div>
                  {session?.meetings && session?.meetings.length > 0 && (
                    <div className={styles['classes-container']}>
                      <div className={styles['classes-preview']}>
                        {session.meetings.map((meeting, index) => (
                          <CourseDateCard
                            className={styles['course-class']}
                            key={index}
                            title={'Reunion ' + (index + 1)}
                            description={
                              'Fecha: ' +
                              meeting.month +
                              ' - ' +
                              meeting.day_number
                            }
                            time={'Hora: ' + meeting.end_time}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {error && (
        <Snackbar
          open={error}
          position={SnackbarPosition.centerBottom}
          kind={SnackbarType.error}
          title={'Ups! no se pudo aprobar este curso'}
          onClose={() => setError(false)}
          duration={3000}
        />
      )}
      <Dialog
        isShown={openModal}
        hasFooter={false}
        hasHeader={false}
        onCloseComplete={() => setOpenModal(false)}
        width={'45vw'}
      >
        <div className={styles['dialog']}>
          <h3>Cambios Requeridos</h3>
          <TextArea label="Describe el problema" rows={8} />
          <div className={styles['footer']}>
            <Button
              title="Cancelar"
              color={ColorsButton.white}
              onClick={() => setOpenModal(false)}
            />
            <Button title="Solicitar cambios" />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default CourseDetailsPage;
