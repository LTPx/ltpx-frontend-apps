import { ClassroomClasses } from '@ltpx-frontend-apps/api';
import { ScheduleClassRow } from '@ltpx-frontend-apps/shared-ui';
import { useStudent, useTeacher } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './student-classes.module.scss';

export function StudentClasses() {
  const [classroomClasses, setClassroomClasses] = useState<ClassroomClasses[]>([]);
  const { _getStudentClasses } = useStudent();
  const { _getMeetingRoomId } = useTeacher();
  const navigate = useNavigate();

  const fetchClasses = useCallback(async () => {
    const { success, data, error } = await _getStudentClasses();
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

  const handleInitMeeting = async(meetingId: number, roomId: string) => {
    if (roomId) {
      console.log('redirect');
      navigate(`/student/live-meeting/${meetingId}/${roomId}`);
    } else {
      const { success, data, error } = await _getMeetingRoomId(meetingId);
      if (success) {
        console.log('data: ', data);
      } else {
        console.log('error: ', error);
      }
    }
  }

  return (
    <div className={styles['container']}>
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
              dropdownActions={[
                {
                  text: 'Iniciar Clase',
                  icon: 'video-outline',
                  onClick: () => {
                    console.log('meeting: ', meeting);
                    handleInitMeeting(meeting.id, meeting.meeting_id);
                  },
                }
              ]}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default StudentClasses;
