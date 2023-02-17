import { ClassroomClasses } from '@ltpx-frontend-apps/api';
import {
  BannerNotification,
  BannerType,
  Button,
  ColorsButton,
  EmptyState,
  Icon,
  ScheduleClassRow,
} from '@ltpx-frontend-apps/shared-ui';
import { useTeacher } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './teacher-meetings-agenda.module.scss';

export function TeacherMeetingsAgenda() {
  const [classroomClasses, setClassroomClasses] = useState<ClassroomClasses[]>(
    []
  );
  const { _getClassrooms, _getMeetingRoomId } = useTeacher();
  const navigate = useNavigate();

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

  const handleInitMeeting = async(meetingId: number, roomId: string) => {
    if (roomId) {
      console.log('redirect');
      navigate(`/teacher/live-meeting/${roomId}`);
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
      {classroomClasses.length === 0 ? (
        <EmptyState
          img="../../../../assets/images/empty-states/class.svg"
          title="Clases en Openmind"
          description="Cuando un usuario compre uno de tus cursos, se mostrara un listado de clases, previamente configuradas en tu curso"
        >
          <div className={`${styles['button-empty-state']}`}>
            <Button
              title={'Ir a Guía de clases'}
              color={ColorsButton.primary}
              outline={true}
            />
          </div>
        </EmptyState>
      ) : (
        <div className={styles['main-container']}>
          <h1 className="add-space-bottom">Mis Clases</h1>
          {/* <BannerNotification
            className={styles['course-notification']}
            type={BannerType.white}
          >
            <div className={styles['notice-course']}>
              <div className={styles['text']}>
                <Icon icon="clock" size={18} />
                <div>
                  <h4>Uno de tus curso necesita agendar clases</h4>
                  <h5>Uno de tus curso necesita agendar clases</h5>
                </div>
              </div>
              <Button title="Contactar alumno via chat" icon="chat-dots" />
            </div>
          </BannerNotification> */}
          <div className={styles['container']}>
            <div className={`${styles['content']} card`}>
              {/* <div className="c">
                <h4>Agendar una nueva clase</h4>
                <Button
                  title="Agendar Nueva Clase"
                  icon="plus"
                  color={ColorsButton.secondary}
                />
              </div> */}
              <h2 className={styles['title']}>Clases de esta semana</h2>
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
                            handleInitMeeting(meeting.id, meeting.meeting_id)
                          },
                        },
                        {
                          text: 'Reagendar Clase',
                          icon: 'clock',
                          onClick: () => {
                            console.log('click re agendar');
                          },
                        },
                      ]}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className={styles['side']}>
              <div
                className={`${styles['create-a-meeting']} card with-padding`}
              >
                <h3>Nueva Clase</h3>
                <p>
                  Algunos cursos incluyen clases personalizadas, aquí puedes
                  agendar nuevas clases
                </p>
                <Button
                  title="Agendar Nueva Clase"
                  icon="plus"
                  color={ColorsButton.secondary}
                />
              </div>
              <div className={styles['calendar']}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherMeetingsAgenda;
