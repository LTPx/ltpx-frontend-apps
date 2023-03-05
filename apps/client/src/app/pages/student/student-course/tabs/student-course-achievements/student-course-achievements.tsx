import styles from './student-course-achievements.module.scss';
import { useStudent } from '@ltpx-frontend-apps/store';
import {
  AchievementCard,
  AchievementDetailsCard,
} from '@ltpx-frontend-apps/shared-ui';
import { useCallback, useEffect } from 'react';

/* eslint-disable-next-line */
export interface StudentCourseAchievementsProps {
  courseId: number;
}

export function StudentCourseAchievements(
  props: StudentCourseAchievementsProps
) {
  const { courseId } = props;
  const { _getStudentAchievements, enrolledCourse } = useStudent();
  const fetchQuizzes = useCallback(async () => {
    const { success, data, error } = await _getStudentAchievements(courseId);
    if (success) {
      console.log('achievements: ', data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchQuizzes();
  }, []);
  return (
    <div className={styles['achievements-content']}>
      <div className={styles['achievements-student']}>
        <h4 className={styles['title-achievement']}>Logros Alcanzados</h4>
        <div className={styles['achievements']}>
          {enrolledCourse.achievements?.map((achievement, index) => (
            <AchievementCard
              key={index}
              image={achievement.image}
              text={achievement.title}
            />
          ))}
        </div>
      </div>
      <div className={styles['all-achievements']}>
        <h4>Como alcanzar los siguientes logros</h4>
        <AchievementDetailsCard
          achievements={enrolledCourse.achievements || []}
          courseId={enrolledCourse.id}
        />
      </div>
    </div>
  );
}

export default StudentCourseAchievements;
