import { ApplicationTeach } from '@ltpx-frontend-apps/api';
import { Icon } from '@ltpx-frontend-apps/shared-ui';
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
    degrees,
    national_id_back,
    national_id_front,
    police_record,
    degrees_attached_files,
  } = application;
  return (
    <div className={styles['container']}>
      <div className={styles['information-personal']}>
        <h3>Información Personal</h3>
        <div className={styles['content']}>
          <div className={styles['title']}>
            <h4>Nombre:</h4>
            <h4>Identificación:</h4>
            <h4>Teléfono:</h4>
          </div>
          <div className={styles['text']}>
            <h4>{name}</h4>
            <h4>{national_id}</h4>
            <h4>{phone}</h4>
          </div>
        </div>
        <div className={styles['attached-files']}>
          <div className={styles['files']}>
            <p>Identificación imágenes</p>
            <div className={styles['file']}>
              <div className={styles['field']}>
                <img src={national_id_front} alt="national id front" />
                <a href={police_record} target="_blank">Ver imagen</a>
              </div>
              <p>Frente</p>
            </div>
            <div className={styles['file']}>
              <div className={styles['field']}>
                <img src={national_id_back} alt="national id front" />
                <a href={police_record} target="_blank">Ver imagen</a>
              </div>
              <p>Parte trasera</p>
            </div>
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
        <h3>Experiencia</h3>
        <h4>{experience}</h4>
      </div>
      <div className={styles['formation']}>
        <h3>Formación</h3>
        <h4>{degrees}</h4>
        <div className={styles['attached-files']}>
          <div className={styles['files']}>
            <p>Archivos adjuntos</p>
            {degrees_attached_files && degrees_attached_files.map((file, key) => (
              <div className={styles['file']} key={key}>
                <div className={styles['field']}>
                  <Icon icon={'file-pdf'} size={40} />
                  <a href={file.file_url} target="_blank">Ver archivo</a>
                </div>
                <p>{file.filename}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles['attached-files']}>
        <div className={styles['files']}>
          <p>Record policial</p>
          <div className={styles['file']}>
            <div className={styles['field']}>
              <Icon icon={'file-pdf'} size={40} />
              <a href={police_record} target="_blank">Ver archivo</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationView;
