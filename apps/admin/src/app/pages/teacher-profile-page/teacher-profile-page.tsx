import styles from './teacher-profile-page.module.scss';
import { Avatar } from 'evergreen-ui';
import { useAdmin } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TeacherProfile } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface TeacherProfilePageProps {}

export function TeacherProfilePage(props: TeacherProfilePageProps) {
  const { _getTeacher } = useAdmin();
  const [showMore, setShowMore] = useState(false);
  const [teacher, setTeacher] = useState<TeacherProfile>();
  const params = useParams();
  const { id } = params;
  const userId = parseInt(id || '');

  const fetchTeacher = useCallback(async () => {
    const { success, data, error } = await _getTeacher(userId);
    if (success) {
      setTeacher(data);
    } else {
      console.log('error: ', error);
    }
    console.log('resp....: ', data);
  }, []);

  useEffect(() => {
    fetchTeacher();
  }, [fetchTeacher]);

  return (
    <div className={styles['container']}>
      {teacher?.user_id && (
        <div className={styles['wrap-content']}>
          <div className={styles['profile-image']}>
            <div className={styles['general-information']}>
              <Avatar name={teacher.image} src={''} size={150} />
              <h3>{teacher.teacher_name}</h3>
              <h4>{'email'}</h4>
            </div>
          </div>
          <div className={styles['profile-information']}>
            <div className={styles['title-content']}>
              <h4 className={styles['title']}>Perfil de Profesor</h4>
            </div>
            <div className={styles['information-teacher']}>
              <div className={styles['info']}>
                <div className={styles['item']}>
                  <h4>Nombre: </h4>
                  <div className={styles['text']}>{teacher.teacher_name}</div>
                </div>
                <div className={styles['item']}>
                  <h4>Habilidades: </h4>
                  <h4 className={styles['text']}>{teacher.skills}</h4>
                </div>
                {/* <div className={styles['item']}>
                  <h4>Teléfono: </h4>
                  <div className={styles['text']}>{viewApplication.phone}</div>
                </div>
                <div className={styles['item']}>
                  <h4>Ubicación: </h4>
                  <h4 className={styles['text']}>
                    {viewApplication.country} - {viewApplication.city}
                  </h4>
                </div> */}
              </div>
            </div>
            <div className={styles['title-content']}>
              <h4 className={styles['title']}>Sobre {teacher.teacher_name}</h4>
            </div>
            {teacher.biography && (
              <>
                {teacher.biography.length > 800 ? (
                  <>
                    <p className={styles['biography']}>
                      {showMore
                        ? teacher.biography
                        : `${teacher.biography.substring(0, 800)}....`}
                      <span
                        className={styles['show']}
                        onClick={() => setShowMore(!showMore)}
                      >
                        {showMore ? 'Mostrar menos' : 'Mostrar mas'}
                      </span>
                    </p>
                  </>
                ) : (
                  <p className={styles['biography']}>{teacher.biography}</p>
                )}
              </>
            )}
            <div className={styles['title-content']}>
              <h4 className={styles['title']}>Video de Presentación</h4>
            </div>
            <div className={styles['video-content']}>
              {teacher.profile_video ? (
                <video
                  width="100%"
                  height="300"
                  src={teacher.profile_video}
                  controls
                ></video>
              ) : (
                <div className={styles['no-video']}>
                  <h4 className={styles['text-video']}>
                    Aun no se agrega un video de presentación
                  </h4>
                </div>
              )}
            </div>
            <div className={styles['title-content']}>
              <h4 className={styles['title']}>Redes Sociales</h4>
            </div>
            <div className={styles['info']}>
              {teacher.social_networks &&
                teacher.social_networks.map((social, key) => (
                  <div className={styles['item']} key={key}>
                    <h4 className={styles['social-network']}>
                      {social.name}:{' '}
                    </h4>
                    <a href={social.url} target="_blank">
                      {social.url}
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherProfilePage;
