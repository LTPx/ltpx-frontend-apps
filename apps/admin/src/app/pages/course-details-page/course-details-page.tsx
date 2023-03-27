import { CLASSROOMS, CourseStatus } from '@ltpx-frontend-apps/api';
import {
  AchievementsList,
  Button,
  ClassroomView,
  ColorsButton,
  CourseContents,
  InformationCard,
  OverviewCourse,
  QuizzesList,
  Snackbar,
  SnackbarPosition,
  SnackbarType,
  Tabs,
} from '@ltpx-frontend-apps/shared-ui';
import { useAdmin, useCourseUtil } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './course-details-page.module.scss';

export function CourseDetailsPage() {
  const [error, setError] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const { viewCourse, _getCourse, _approveCourse } = useAdmin();
  const { translateCategory, translateLanguage, translateLevel } =
    useCourseUtil();
  const { classroom, quizzes, contents, achievements } = viewCourse;
  const params = useParams();
  const { id } = params;
  const courseId = parseInt(id || '');
  const navigate = useNavigate();

  const tabs = [
    { text: 'Detalles' },
    { text: 'Contenidos' },
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

  const handleApproveCourse = async() => {
    const { success, error } = await _approveCourse(viewCourse.id);
    if (success) {
      console.log('approved');
      navigate('/admin/courses');
    } else {
      setError(true);
      console.log('error: ', error);
    }
  }

  return (
    <div className={styles['container']}>
      {viewCourse.id && (
        <div className="c">
          <div className={styles['header']}>
            <h1>{viewCourse.title}</h1>
            { viewCourse.status === CourseStatus.review && (
              <div className={styles['actions']}>
                <Button
                  title="Requiere cambios"
                  color={ColorsButton.secondary}
                  outline={true}
                  onClick={() => {
                    // handleRequestChange();
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
                  goals={viewCourse.learn_goals ? viewCourse.learn_goals?.split('\n') : []}
                  requirements={viewCourse.requirements ? viewCourse.requirements.split('\n') : []}
                />
              )}
              {selectedTab === 1 && (
                <CourseContents contents={contents || []} />
              )}
              {selectedTab === 2 && <QuizzesList quizzes={quizzes || []} />}
              {selectedTab === 3 && (
                <AchievementsList achievements={achievements || []} />
              )}
              {selectedTab === 4 && classroom &&(
                <>
                  <InformationCard
                    title={CLASSROOMS[classroom.condition].title}
                    text={CLASSROOMS[classroom.condition].text}
                    icon={CLASSROOMS[classroom.condition].icon}
                    selected={true}
                  />
                  {classroom.meetings.length > 0 && (
                    <ClassroomView
                      classroom={classroom}
                      className={styles['classroom-summary']}
                    />
                  )}
                </>
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
    </div>
  );
}

export default CourseDetailsPage;
