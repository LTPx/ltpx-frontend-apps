import { ClassroomClasses } from '@ltpx-frontend-apps/api';
import { Button, Icon } from '@ltpx-frontend-apps/shared-ui';
import { useTeacher } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import styles from './teacher-meetings-agenda.module.scss';

export function TeacherMeetingsAgenda() {
  const [classroomClasses, setClassroomClasses] = useState<ClassroomClasses[]>(
    []
  );
  const { _getClassrooms } = useTeacher();

  const fetchClasses = useCallback(async () => {
    const { success, data, error } = await _getClassrooms();
    if (success) {
      console.log('data: ', data);
      setClassroomClasses(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  return (
    <div className={styles['container']}>
      <div className={`${styles['content']} card`}>
        <h2 className={styles['title']}>Clases de esta semana</h2>
        {classroomClasses.map((item, index) => (
          <div className={styles['meetings']} key={index}>
            {item.meetings.map((meeting, indexMeeting) => (
              <div className={styles['meeting-row']} key={indexMeeting}>
                <div className={styles['date']}>
                  <h5>{meeting.month}</h5>
                  <h3>{meeting.day_number}</h3>
                  <h5>
                    {meeting.start_time} - {meeting.end_time}
                  </h5>
                </div>
                <div className={styles['information']}>
                  <div className={styles['details']}>
                    <h3>
                      Clase {indexMeeting + 1}: {item.title}
                    </h3>
                    <div className={styles['details-items']}>
                      <div className={styles['details-item']}>
                        <Icon icon="user-group" size={18} />
                        <h5>{item.max_participants} Participantes</h5>
                      </div>
                      <div className={styles['details-item']}>
                        <Icon icon="clock" size={18} />
                        <h5>{item.duration} min</h5>
                      </div>
                    </div>
                  </div>
                  <div className={styles['actions']}>
                    <Button title="Iniciar clase" icon="desktop" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles['side']}>
        <div className={styles['calendar']}></div>
      </div>
    </div>
  );
}

export default TeacherMeetingsAgenda;
