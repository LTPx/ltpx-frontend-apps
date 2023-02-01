import { useAdmin } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './course-details-page.module.scss';

export function CourseDetailsPage() {
  const { viewCourse, _getCourse, getCourseStore } = useAdmin();
  const params = useParams();
  const { id } = params;
  const appId = parseInt(id || '');
  const fetchData = useCallback(async () => {
    const resp = await _getCourse(appId);
    console.log('course....: ', resp);
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
      <h1>Welcome to CourseDetailsPage!</h1>
    </div>
  );
}

export default CourseDetailsPage;
