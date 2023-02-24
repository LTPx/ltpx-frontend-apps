import { ClassroomClasses } from '@ltpx-frontend-apps/api';
import { Button, ScheduleClassRow } from '@ltpx-frontend-apps/shared-ui';
import { useStudent } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import styles from './student-classes.module.scss';

export function StudentClasses() {
  const [classroomClasses, setClassroomClasses] = useState<ClassroomClasses[]>(
    []
  );
  const { _getStudentClasses } = useStudent();

  const fetchClasses = useCallback(async () => {
    const { success, data, error } = await _getStudentClasses();
    if (success) {
      setClassroomClasses(data);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  return (
    <div className={`${styles['container']} card with-padding`}>
      <h2 className="">Clases de este mes</h2>
      <h5 className="add-space-bottom muted">
        Una vez el profesor inicie la clase se habilitara un link para que te
        unas
      </h5>
      {classroomClasses.map((item, index) => (
        <div className={styles['meetings']} key={index}>
          {item.meetings.map((meeting, indexMeeting) => (
            <ScheduleClassRow
              className={styles['meeting']}
              title={`Clase ${indexMeeting + 1}: ${item.title}`}
              duration={item.duration}
              date={''}
              participants={item.max_participants}
              key={indexMeeting}
              dateMonth={meeting.month}
              dayNumber={meeting.day_number}
              startTime={meeting.start_time}
            >
              {meeting.meeting_id ? (
                <Button
                  title={`Unirme Ahora`}
                  outline={true}
                  link={`/student/live-meeting/${meeting.id}/${meeting.meeting_id}`}
                />
              ) : (
                <Button
                  title="No ha iniciado aun"
                  outline={true}
                  disabled={true}
                />
              )}
            </ScheduleClassRow>
          ))}
        </div>
      ))}
    </div>
  );
}

export default StudentClasses;
