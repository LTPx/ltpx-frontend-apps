import styles from './student-course-achievements.module.scss';
import { useStudent } from '@ltpx-frontend-apps/store';
import { AchievementDetailsCard } from '@ltpx-frontend-apps/shared-ui';
import { useCallback, useEffect, useState } from 'react';
import {
  AchievementsStudentResponse,
  Condition,
} from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface StudentCourseAchievementsProps {
  courseId: number;
}

export function StudentCourseAchievements(
  props: StudentCourseAchievementsProps
) {
  const { courseId } = props;
  const [achievementsView, setAchievementsView] =
    useState<AchievementsStudentResponse>();
  const { _getStudentAchievements } = useStudent();
  const fetchQuizzes = useCallback(async () => {
    const { success, data, error } = await _getStudentAchievements(courseId);
    if (success) {
      console.log('achievements: ', data);
      setAchievementsView(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  function getTotalPoints(conditions: Condition[]) {
    const ids =
      achievementsView?.conditions_completed.map(
        (condition) => condition.condition_id
      ) || [];
    return conditions.reduce((sum, condition) => {
      return (
        sum + (ids.includes(condition.id) ? condition.points_to_assign : 0)
      );
    }, 0);
  }

  function buildQuizzesLink(conditions: Condition[]) {
    const ids =
      achievementsView?.conditions_completed.map(
        (condition) => condition.condition_id
      ) || [];
    return conditions.map((condition) => {
      return {
        url: `/student/course/${courseId}/quiz/${condition.entity_id}`,
        name: condition.description || '',
        points: condition.must_reach_value,
        completed: ids.includes(condition.id),
      };
    });
  }

  return (
    <div className={styles['achievements-content']}>
      <div className={styles['all-achievements']}>
        {achievementsView !== undefined && (
          <div className={styles['achievements']}>
            {achievementsView.course_achievements.map((achievement, index) => (
              <AchievementDetailsCard
                key={index}
                title={achievement.title}
                imageUrl={achievement.image}
                rule={achievement.rule}
                currentPoints={getTotalPoints(
                  achievement.conditions_attributes
                )}
                totalPoints={achievement.points_needed}
                quizzes={buildQuizzesLink(achievement.conditions_attributes)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentCourseAchievements;
