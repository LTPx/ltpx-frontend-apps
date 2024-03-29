import {
  CLASSROOM_NONE,
  CourseSession,
  SessionParams,
  TeacherClassType,
} from '@ltpx-frontend-apps/api';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button, { ColorsButton } from '../button/button';
import Drawer from '../drawer/drawer';
import GroupSelectOptionCard from '../group-select-option-card/group-select-option-card';
import SessionForm from '../session-form/session-form';
import styles from './course-classes.module.scss';

const classesOptions = [
  {
    value: 'classes',
    title: 'CLASES POR VIDEOCÁMARA',
    text: 'Este curso incluirá clases para los estudiantes',
    icon: 'person-video',
  },
  // CLASSROOM_CUSTOMIZE,
  CLASSROOM_NONE,
];

/* eslint-disable-next-line */
export interface CourseClassesProps {
  open?: boolean;
  onClose?: () => void;
  onSave: (classroom: SessionParams) => void;
  session?: CourseSession;
}

export function CourseClasses(props: CourseClassesProps) {
  const { open, onClose, onSave, session } = props;
  const [selectedTypeClass, setSelectedTypeClass] = useState(
    TeacherClassType.none
  );
  const { t } = useTranslation();
  const [openSession, setOpenSession] = useState(false);

  const handleSelectedOption = (option: any) => {
    if (option === 'classes') {
      setOpenSession(true);
    }
    setSelectedTypeClass(option);
  };

  const onSubmit = (data: any) => {
    const classroom = { ...data };
    if (data.condition) {
      onSave && onSave(classroom);
    } else {
      onSave && onSave({ ...classroom, ...{ condition: selectedTypeClass } });
    }
    setOpenSession(false);
    onClose && onClose();
  };

  return (
    <div className={styles['container']}>
      <Drawer
        open={open}
        disableClose={false}
        onClose={() => {
          onClose && onClose();
        }}
        title={t('courseClasses.title') || ''}
      >
        <div className={styles['content']}>
          <div className="d">
            <GroupSelectOptionCard
              className={styles['options']}
              options={classesOptions}
              onChange={(option) => {
                handleSelectedOption(option);
              }}
            />
          </div>
          <div className={styles['footer']}>
            <Button
              color={ColorsButton.white}
              onClick={() => {
                onClose && onClose();
              }}
              title={t('buttons.cancel')}
            />
            <Button
              onClick={() => {
                onSave({
                  private_sessions: true,
                  max_participants: 0,
                  call_time_min: 0,
                  meetings_attributes: session
                    ? session.meetings.map((meeting) => {
                        return {
                          id: meeting.id,
                          _destroy: true,
                          host_user_id: session.user_id,
                          start_date: '',
                        };
                      })
                    : [],
                });
                onClose && onClose();
              }}
              title={t('buttons.save')}
              disabled={!selectedTypeClass}
            />
          </div>
        </div>
      </Drawer>
      <SessionForm
        open={openSession}
        onClose={() => {
          setOpenSession(false);
        }}
        onSubmit={(data) => {
          onSubmit(data);
        }}
        session={session}
      />
    </div>
  );
}

export default CourseClasses;
