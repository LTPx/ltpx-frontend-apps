import styles from './student-profile-card.module.scss';

/* eslint-disable-next-line */
export interface StudentProfileCardProps {
  studentName: string;
  email: string;
  country: string;
  city: string;
  date: string;
  className?: string;
}

export function StudentProfileCard(props: StudentProfileCardProps) {
  const { studentName, email, country, city, date, className } = props;
  return (
    <div className={`${styles['content']} ${className}`}>
      <div className={styles['certificate-content']}>
        <div className={styles['header']}>
          <h2 className={styles['title']}>Perfil de Estudiante</h2>
        </div>
        <div className={styles['body']}>
          <div className={styles['information']}>
            <div className={styles['item-1']}>
              <h4>Alumno: </h4>
              <h4 className={styles['text']}>{studentName}</h4>
            </div>
            <div className={styles['item']}>
              <h4>Correo Electrónico: </h4>
              <h4 className={styles['text']}>{email}</h4>
            </div>
            <div className={styles['item']}>
              <h4>País: </h4>
              <h4 className={styles['text']}>{country}</h4>
            </div>
            <div className={styles['item']}>
              <h4>Ciudad: </h4>
              <h4 className={styles['text']}>{city}</h4>
            </div>
            <div className={styles['item']}>
              <h4>Se unió en: </h4>
              <h4 className={styles['text']}>{date}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfileCard;
