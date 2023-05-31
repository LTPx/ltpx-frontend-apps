import { ClassroomClasses } from '@ltpx-frontend-apps/api';
import {
  Button,
  ColorsButton,
  EmptyState,
  ScheduleClassRow,
  RescheduleMeetingForm,
  Loader,
  NewClassForm,
} from '@ltpx-frontend-apps/shared-ui';
import { useTeacher } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './teacher-meetings-agenda.module.scss';

export function TeacherMeetingsAgenda() {
  const [classroomClasses, setClassroomClasses] = useState<ClassroomClasses[]>(
    []
  );
  const [openModal, setOpenModal] = useState(false);
  const [openClass, setOpenClass] = useState(false);
  const { _getClassrooms, _getMeetingRoomId, loadingTeacherApi } = useTeacher();
  const navigate = useNavigate();

  const fetchClasses = useCallback(async () => {
    const { success, data, error } = await _getClassrooms();
    if (success) {
      const sortedClasses = data.map((item: { meetings: any[]; }) => ({
        ...item,
        meetings: item.meetings.sort((a, b) => {
          if (a.month !== b.month) {
            return a.month - b.month;
          }
          return a.day_number - b.day_number;
        }),
      }));
      console.log('data: ', sortedClasses);
      // console.log('data: ', data);
      setClassroomClasses(sortedClasses);
    } else {
      console.log('error: ', error);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const handleInitMeeting = async (meetingId: number, roomId: string) => {
    if (roomId) {
      navigate(`/teacher/live-meeting/${meetingId}/${roomId}`);
    } else {
      const { success, data, error } = await _getMeetingRoomId(meetingId);
      if (success) {
        navigate(`/teacher/live-meeting/${meetingId}/${data.meeting_id}`);
      } else {
        console.log('error: ', error);
      }
    }
  };

  return (
    <div className={styles['container']}>
      {loadingTeacherApi ? (
        <Loader />
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
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
              <div className={styles['container']}>
                <div className={`${styles['content']} card`}>
                  <h2 className={styles['title']}>Clases de este mes</h2>
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
                          dropdownActions={[
                            {
                              text: 'Iniciar Clase',
                              icon: 'video-outline',
                              onClick: () => {
                                console.log('meeting: ', meeting);
                                handleInitMeeting(
                                  meeting.id,
                                  meeting.meeting_id
                                );
                              },
                            },
                            {
                              text: 'Reagendar Clase',
                              icon: 'clock',
                              disabled: true,
                              onClick: () => {
                                setOpenModal(true);
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
                      className={styles['btn']}
                      title="Agendar Nueva Clase"
                      icon="plus"
                      color={ColorsButton.secondary}
                      onClick={() => {
                        setOpenClass(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {openModal && (
        <RescheduleMeetingForm
          open={openModal}
          titleClass="Clase 1: Aprende lenguaje de señales en 5 sesiones"
          date="06 Feb"
          time="10:00 - 10:30"
          onClose={() => {
            setOpenModal(false);
          }}
        />
      )}
      {openClass && (
        <NewClassForm
          open={openClass}
          onClose={() => {
            setOpenClass(false);
          }}
        />
      )}
    </div>
  );
}

export default TeacherMeetingsAgenda;
