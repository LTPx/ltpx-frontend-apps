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
  useMoment,
} from '@ltpx-frontend-apps/shared-ui';
import { useAdmin, useCourseUtil } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './course-details-page.module.scss';
import { Dialog } from 'evergreen-ui';
import RequireChangesForm from '../../components/require-changes-form/require-changes-form';

export function CourseDetailsPage() {
  const [error, setError] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const { viewCourse, _getCourse, _approveCourse, _rejectCourse } = useAdmin();
  const { translateCategory, translateLanguage, translateLevel } =
    useCourseUtil();
  const { classroom, quizzes, contents, achievements, session, tasks } =
    viewCourse;
  const params = useParams();
  const { formatDate } = useMoment();
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

  async function handleRequireChanges(comment: { comment: string }) {
    const { success, error } = await _rejectCourse(
      viewCourse.id,
      comment.comment
    );
    if (success) {
      navigate('/admin/courses');
    } else {
      setError(true);
      console.log(error);
    }
  }

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
                    setOpenModal(true);
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
          {viewCourse.status === CourseStatus.rejected && (
            <div className={styles['comment-admin']}>
              <h4 className={styles['changes-title']}>
                Cambios sugeridos por Openmind:
              </h4>
              {viewCourse.admin_comments && (
                <div className={styles['comment-wrap']}>
                  {viewCourse.admin_comments.map((element, index) => (
                    <div className={styles['comment']} key={index}>
                      <h4>{element.comment}</h4>
                      <h5 className={styles['date-comment']}>
                        Fecha de comentario: {formatDate(element.created_at)}
                      </h5>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <div>
            <div className={styles['cover']}>
              <img src={viewCourse.cover_url}></img>
            </div>
            <div className={styles['basic-info']}>
              <span className={`${styles['noted']}`}>
                {translateCategory(viewCourse.category_slug)}
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
        title="Solicitar Cambios"
        onCloseComplete={() => setOpenModal(false)}
        width={'45vw'}
      >
        <RequireChangesForm
          onCancel={() => setOpenModal(false)}
          onSubmit={(data) => handleRequireChanges(data)}
        />
      </Dialog>
    </div>
  );
}

export default CourseDetailsPage;
