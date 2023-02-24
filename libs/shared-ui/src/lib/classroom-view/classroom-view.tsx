import { Classroom } from '@ltpx-frontend-apps/api';
import styles from './classroom-view.module.scss';

/* eslint-disable-next-line */
export interface ClassroomViewProps {
  classroom: Omit<Classroom, 'condition'>;
  className?: string;
}

export function ClassroomView(props: ClassroomViewProps) {
  const { classroom, className } = props;

  const formatDatetime = (date: string) => {
    return date.split('T').join(' a las ');
  };

  const toHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  };

  return (
    <div className={`${styles['classroom-summary']} ${className || ''}`}>
      <h3>Resumen de las clases</h3>
      <h4>
        Este curso tendrá un rango de: {classroom.min} a {classroom.max} de
        estudiantes
      </h4>
      <h4>Cada clase durara: {toHoursAndMinutes(classroom.call_time_min)}</h4>
      <h4>Las clases se dictaran los días: </h4>
      {classroom.meetings.map((date, key) => (
        <li key={key}>{formatDatetime(date)}</li>
      ))}
    </div>
  );
}

export default ClassroomView;
