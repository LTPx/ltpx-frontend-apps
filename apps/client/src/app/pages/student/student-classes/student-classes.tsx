import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect } from 'react';
import styles from './student-classes.module.scss';

export function StudentClasses() {
  const { _getStudentClasses } = useStudent();

  const fetchClasses = useCallback(async () => {
    const { success, data, error } = await _getStudentClasses();
    if (success) {
      console.log('data: ', data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  return (
    <div className={styles['container']}>
      <h1>Welcome to StudentClasses!</h1>
    </div>
  );
}

export default StudentClasses;
