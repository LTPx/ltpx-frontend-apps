import { Button, Icon } from '@ltpx-frontend-apps/shared-ui';
import styles from './teacher-meetings-agenda.module.scss';

const classes = [
  {
    users: 10,
    title: 'Clase 1: Aprende lenguaje de señales en 5 sesiones ',
    duration: '30',
    dateDay: '06',
    dateMonth: 'Feb',
    startTime: '10:00',
    endTime: '10:30',
  },
  {
    users: 5,
    title: 'Clase 2: Aprende lenguaje de señales en 5 sesiones ',
    duration: '30',
    dateDay: '08',
    dateMonth: 'Feb',
    startTime: '10:00',
    endTime: '10:30',
  },
  {
    users: 3,
    title: 'Clase 3: Aprende lenguaje de señales en 5 sesiones ',
    duration: '30',
    dateDay: '21',
    dateMonth: 'Feb',
    startTime: '10:00',
    endTime: '10:30',
  },
];

export function TeacherMeetingsAgenda() {
  return (
    <div className={styles['container']}>
      <div className={`${styles['content']} card`}>
        <h2 className={styles['title']}>Clases de esta semana</h2>
        <div className={styles['meetings']}>
          {classes.map((item, index) => (
            <div className={styles['meeting-row']} key={index}>
              <div className={styles['date']}>
                <h4>{item.dateMonth}</h4>
                <h2>{item.dateDay}</h2>
                <h5>
                  {item.startTime} - {item.endTime}
                </h5>
              </div>
              <div className={styles['information']}>
                <div className={styles['details']}>
                  <h3>{item.title}</h3>
                  <div className={styles['details-items']}>
                    <div className={styles['details-item']}>
                      <Icon icon='user-group' size={18} />
                      <h5>{item.users} Participantes</h5>
                    </div>
                    <div className={styles['details-item']}>
                      <Icon icon='clock' size={18} />
                      <h5>{item.duration} min</h5>
                    </div>
                  </div>
                </div>
                <div className={styles['actions']}>
                  <Button title="Iniciar clase" icon='desktop'/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles['side']}>
        <div className={styles['calendar']}></div>
      </div>
    </div>
  );
}

export default TeacherMeetingsAgenda;
