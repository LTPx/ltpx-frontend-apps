import { ApplicationTeach } from '@ltpx-frontend-apps/api';
import styles from './application-view.module.scss';

/* eslint-disable-next-line */
export interface ApplicationViewProps {
  application: ApplicationTeach;
}

export function ApplicationView(props: ApplicationViewProps) {
  const { application } = props;
  const {
    name,
    national_id,
    experience,
    phone,
    country,
    city,
    degrees
  } = application;
  return (
    <div className={styles['container']}>
      <div className={styles['information-personal']}>
        <h3>Información Personal</h3>
        <div className={styles['content']}>
          <div className={styles['title']}>
            <h4>Nombre:</h4>
            <h4>Cédula:</h4>
            <h4>Teléfono:</h4>
          </div>
          <div className={styles['text']}>
            <h4>{name}</h4>
            <h4>{national_id}</h4>
            <h4>{phone}</h4>
          </div>
        </div>
      </div>
      <div className={styles['location']}>
        <h3>Ubicación</h3>
        <h4>
          {country} - {city}
        </h4>
      </div>
      <div className={styles['formation']}>
        <h3>Experiencia y Formación</h3>
        <ul className={styles['list']}>
          <li>
            <h4>{experience}</h4>
          </li>
          <li>
            <h4>{degrees}</h4>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ApplicationView;
