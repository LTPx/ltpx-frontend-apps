import styles from './student-course-achievements.module.scss';
import { useStudent, useUtil } from '@ltpx-frontend-apps/store';
import {
  AchievementDetailsCard,
  TaskFormStudent,
} from '@ltpx-frontend-apps/shared-ui';
import { useCallback, useEffect, useState } from 'react';
import {
  AchievementsStudentResponse,
  Condition,
  EntityAchievement,
  TaskModel,
  TaskStudent,
} from '@ltpx-frontend-apps/api';
import { Dialog } from 'evergreen-ui';

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
  const { _getStudentAchievements, _getStudentTask, _sendTask } = useStudent();
  const [studentTask, setStudentTask] = useState<TaskModel>();
  const [openModal, setOpenModal] = useState(false);
  const { setMessageToast } = useUtil();

  const fetchQuizzes = useCallback(async () => {
    const { success, data, error } = await _getStudentAchievements(courseId);
    if (success) {
      setAchievementsView(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  async function getTask(taskId: number) {
    const { success, data, error } = await _getStudentTask(courseId, taskId);
    if (success) {
      setStudentTask(data);
      setOpenModal(true);
      console.log(studentTask);
      console.log('aqui', taskId);
    } else {
      console.log('error: ', error);
    }
  }

  async function handleSendTask(params: TaskStudent) {
    const paramsData = studentTask
      ? { ...params, ...{ id: studentTask.id } }
      : params;
    const { success, error } = await _sendTask(paramsData);
    if (success) {
      setMessageToast('success', 'Tu tarea ha sido enviada');
    } else {
      setMessageToast('error', error);
    }
  }

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

    return conditions
      .map((condition) => {
        if (condition.entity === EntityAchievement.quiz) {
          return {
            url: `/student/course/${courseId}/quiz/${condition.entity_id}`,
            name: condition.description || '',
            points: condition.must_reach_value,
            completed: ids.includes(condition.id),
          };
        } else if (condition.entity === EntityAchievement.task) {
          return {
            url: '',
            name: condition.description || '',
            points: condition.must_reach_value,
            completed: ids.includes(condition.id),
            onClick: () => {
              getTask(condition.entity_id);
            },
          };
        }
        return null;
      })
      .filter(Boolean) as {
      name: string;
      url: string;
      completed: boolean;
      points?: number;
      onClick?: () => void;
    }[];
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
                achievement={buildQuizzesLink(
                  achievement.conditions_attributes
                )}
              />
            ))}
          </div>
        )}
      </div>
      {studentTask !== undefined && (
        <>
          <Dialog
            isShown={openModal}
            hasFooter={false}
            title={studentTask.title}
            onCloseComplete={() => {
              setOpenModal(false);
            }}
            width={'50vw'}
            shouldCloseOnOverlayClick={false}
          >
            <TaskFormStudent
              description={studentTask.description}
              fileTask={studentTask.file_url}
              onClose={() => setOpenModal(false)}
              onSubmit={(data) => {
                handleSendTask({ ...data, ...{ task_id: studentTask.id } });
              }}
            />
          </Dialog>
        </>
      )}
    </div>
  );
}

export default StudentCourseAchievements;
