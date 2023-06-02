import { Button, ColorsButton } from '@ltpx-frontend-apps/shared-ui';
import { useTeacher, useUser } from '@ltpx-frontend-apps/store';
import { useCallback, useEffect, useState } from 'react';
import styles from './teacher-account-profile.module.scss';
import { NavLink } from 'react-router-dom';

/* eslint-disable-next-line */
export interface TeacherAccountProfileProps {}

export function TeacherAccountProfile(props: TeacherAccountProfileProps) {
  const { profile, getProfile } = useTeacher();
  const [showMore, setShowMore] = useState(false);

  const fetchProfile = useCallback(async () => {
    await getProfile();
  }, []);

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className={styles['container']}>
      {profile.teacher_name && (
        <>
          <div className={styles['title-content']}>
            <h4 className={styles['title']}>Perfil de Profesor</h4>
            <Button
              className={styles['btn-edit']}
              title="Editar"
              color={ColorsButton.secondary}
              link="/teacher/account/profile-edit"
            />
          </div>
          <div className={styles['information-teacher']}>
            <div className={styles['info']}>
              <div className={styles['item']}>
                <h4>Nombre de profesor: </h4>
                <div className={styles['text']}>
                  <NavLink to={`/teacher/web-profile/${profile.slug}`}>
                    {profile.teacher_name}
                  </NavLink>
                </div>
              </div>
              <div className={styles['item']}>
                <h4>Habilidades: </h4>
                <h4 className={styles['text']}>{profile.skills}</h4>
              </div>
            </div>
          </div>
          <div className={styles['title-content']}>
            <h4 className={styles['title']}>Sobre mi</h4>
          </div>

          {profile.biography && (
            <>
              {profile.biography.length > 800 ? (
                <>
                  <p className={styles['biography']}>
                    {showMore
                      ? profile.biography
                      : `${profile.biography.substring(0, 800)}....`}
                    <span
                      className={styles['show']}
                      onClick={() => setShowMore(!showMore)}
                    >
                      {showMore ? 'Mostrar menos' : 'Mostrar mas'}
                    </span>
                  </p>
                </>
              ) : (
                <p className={styles['biography']}>{profile.biography}</p>
              )}
            </>
          )}
          <div className={styles['title-content']}>
            <h4 className={styles['title']}>Video de Presentación</h4>
          </div>
          <div className={styles['video-content']}>
            {profile.profile_video ? (
              <video
                width="100%"
                height="300"
                src={profile.profile_video}
                controls
              ></video>
            ) : (
              <div className={styles['no-video']}>
                <h4 className={styles['text-video']}>
                  Aun no agregaste un video de Presentación
                </h4>
              </div>
            )}
          </div>
          <div className={styles['title-content']}>
            <h4 className={styles['title']}>Redes Sociales</h4>
          </div>
          <div className={styles['info']}>
            {profile.social_networks.map((social, key) => (
              <div className={styles['item']} key={key}>
                <h4 className={styles['social-network']}>{social.name}: </h4>
                <a href={social.url} target="_blank">
                  {social.url}
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TeacherAccountProfile;
