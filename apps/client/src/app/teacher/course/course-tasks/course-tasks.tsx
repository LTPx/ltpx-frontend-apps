import { TaskModel, NewTaskParams } from '@ltpx-frontend-apps/api';
import {
  BasicRow,
  Button,
  ColorsButton,
  SetupCard,
  TaskForm,
} from '@ltpx-frontend-apps/shared-ui';
import { useCourse } from '@ltpx-frontend-apps/store';
import { Dialog } from 'evergreen-ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './course-tasks.module.scss';

/* eslint-disable-next-line */
export interface CourseTasksProps {
  onSubmit: (data: any) => void;
}

export function CourseTasks(props: CourseTasksProps) {
  const { onSubmit } = props;
  const [task, setTask] = useState<TaskModel>();
  const [openModal, setOpenModal] = useState(false);
  const { _addTask, _updateTask, _removeTask, course } = useCourse();
  const { tasks } = course;

  async function handleSaveTask(params: NewTaskParams) {
    const { data, success, error } = await _addTask(course.id, params);
    if (success) {
      setTask(data);
      onSubmit({
        success
      })
    } else {
      onSubmit({
        success: false,
        error
      })
    }
  }

  async function handleRemoveTask(taskId: number) {
    const { success, error } = await _removeTask(course.id, taskId);
    if (success) {
      console.log('success remove');
      onSubmit({
        success,
      });
    } else {
      console.log('error: ', error);
      onSubmit({
        success: false,
        error,
      });
    }
  }
  const { t } = useTranslation();

  return (
    <div className={styles['container']}>
      <div className={styles['header-text']}>
        <h2>{t('courseTask.title')}</h2>
        <h4 className="muted">{t('courseTask.subtitle')}</h4>
      </div>
      <div className={styles['task-upload']}>
        {tasks.length > 0 ? (
          <div className={styles['task-list']}>
            {tasks.map((element, index) => (
              <div key={index}>
                <BasicRow
                  icon="ordered-list"
                  onClick={() => setOpenModal(true)}
                  title={element.title}
                  subtitle={element.description}
                  remove={() => {
                    handleRemoveTask(element.id);
                  }}
                />
              </div>
            ))}
            <div className={styles['button-content']}>
              <Button
                className={styles['btn-add-task']}
                title="Crear Nueva Tarea"
                color={ColorsButton.secondary}
                outline={true}
                onClick={() => setOpenModal(true)}
              />
            </div>
          </div>
        ) : (
          <SetupCard
            onClick={() => setOpenModal(true)}
            icon={'task-outline'}
            text={t('courseTask.text')}
            titleButton={t('buttons.config') || ''}
          />
        )}
      </div>
      <Dialog
        isShown={openModal}
        hasFooter={false}
        hasHeader={false}
        onCloseComplete={() => setOpenModal(false)}
        width={'40vw'}
      >
        <TaskForm
          onClose={() => setOpenModal(false)}
          onSubmit={(params) => {
            handleSaveTask(params);
          }}
        />
      </Dialog>
    </div>
  );
}

export default CourseTasks;
