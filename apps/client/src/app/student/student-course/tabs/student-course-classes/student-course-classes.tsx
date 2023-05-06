import styles from './student-course-classes.module.scss';
import { CourseSession, QuizStudent } from '@ltpx-frontend-apps/api';
import {
  Button,
  CourseDateCard,
  useMoment,
} from '@ltpx-frontend-apps/shared-ui';

export interface StudentCourseClassesProps {
  session: CourseSession;
}

export function StudentCourseClasses(props: StudentCourseClassesProps) {
  const { session } = props;
  const { customFormatDate } = useMoment();

  return (
    <div className={styles['course-date']}>
      {session.meetings.map((meeting, index) => (
        <CourseDateCard
          className={styles['course-class']}
          key={index}
          size={true}
          title={`Clase ${index + 1}: ${customFormatDate(
            meeting.start_date,
            'MMM D YYYY'
          )}`}
          description={`La clase tendrán una duración de ${session.call_time_min} min`}
          time={`Hora de inicio: ${customFormatDate(
            meeting.start_date,
            'h:mm a'
          )}`}
        >
          {meeting.meeting_id ? (
            <Button
              className={styles['btn-class']}
              title={`Unirme a Clase`}
              full={true}
              link={`/student/live-meeting/${meeting.id}/${meeting.meeting_id}`}
            />
          ) : (
            <Button
              className={styles['btn-class']}
              title="No ha iniciado aun"
              full={true}
              outline={true}
              disabled={true}
            />
          )}
        </CourseDateCard>
      ))}
      {session.meetings.length === 0 && <h3>Este curso no requiere de clases</h3>}
    </div>
  );
}

export default StudentCourseClasses;
