import styles from './about-us.module.scss';
import { ContentDescription } from '@ltpx-frontend-apps/shared-ui';

/* eslint-disable-next-line */
export interface AboutUsProps {}

export function AboutUs(props: AboutUsProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['mission']}>
          <div className={styles['mission-text']}>
            <h1>Open Mind</h1>
            <p>
              Open Mind es una plataforma educativa innovadora que ofrece una
              variedad de clases atractivas en línea para grupos pequeños. A
              diferencia de las clases tradicionales, las clases extraescolares
              brindan a los niños la oportunidad única de explorar sus intereses
              en profundidad a través de videos interactivos en vivo realizados
              por educadores independientes con experiencia.
            </p>
          </div>
          <div className={styles['mission-image']}>
            <img
              alt="mission-img"
              src="https://cdni.iconscout.com/illustration/premium/thumb/group-therapy-3163255-2655841.png?f=webp"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
