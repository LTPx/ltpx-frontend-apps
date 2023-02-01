import {
  CourseContents,
  OverviewCourse,
  QuizzesList,
  Tabs,
} from '@ltpx-frontend-apps/shared-ui';
import { useAdmin, useCourseUtil } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './course-details-page.module.scss';

export function CourseDetailsPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const { viewCourse, _getCourse, getCourseStore } = useAdmin();
  const {
    translateCategory,
    translateLanguage,
    translateLevel,
    translateStatus,
  } = useCourseUtil();
  const params = useParams();
  const { id } = params;
  const appId = parseInt(id || '');
  const tabs = [
    { text: 'Detalles' },
    { text: 'Contenidos' },
    { text: 'Test' },
    { text: 'Logros' },
  ];

  const fetchData = useCallback(async () => {
    const resp = await _getCourse(appId);
    console.log('viewCourse....: ', resp);
  }, []);

  useEffect(() => {
    if (viewCourse.id) {
      getCourseStore(appId);
    } else {
      fetchData();
    }
  }, []);
  return (
    <div className={styles['container']}>
      {viewCourse && (
        <>
          <div className={styles['cover']}>
            <img src={viewCourse.cover_url}></img>
          </div>
          <h1>{viewCourse.title}</h1>
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
                goals={viewCourse.learn_goals?.split('\n') || []}
                requirements={viewCourse.requirements?.split('\n') || []}
              />
            )}
            {selectedTab === 1 && (
              <CourseContents contents={viewCourse.contents || []} />
            )}
            {selectedTab === 2 && (
              <QuizzesList quizzes={viewCourse.quizzes || []} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default CourseDetailsPage;
