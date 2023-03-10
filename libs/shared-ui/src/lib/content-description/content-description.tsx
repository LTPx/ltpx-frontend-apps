import Icon from '../icon/icon';
import styles from './content-description.module.scss';

/* eslint-disable-next-line */
export interface ContentDescriptionProps {}

export function ContentDescription(props: ContentDescriptionProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['head']}>
        <h1 className={styles['title']}>Por qué estudiar con OpenMind</h1>
        <h4>Descubre tu programa perfecto en nuestros cursos.</h4>
      </div>
      <div className={styles['content']}>
        <div className={styles['description']}>
          <div className={styles['item-one']}>
            <div className={styles['icon']}>
              <Icon color="#EE8E00" icon={'browser'} size={45} />
            </div>
          </div>
          <h4>Aprende cualquier tema</h4>
          <h5>
            Aprende nuevas habilidades, inspírate a hacer nuevos
            descubrimientos.
          </h5>
        </div>
        <div className={styles['description']}>
          <div className={styles['item-two']}>
            <div className={styles['icon']}>
              <Icon color="#5066F5" icon={'lightbulb'} size={45} />
            </div>
          </div>
          <h4>Aprendizaje flexible</h4>
          <h5> A través de video chat o mensajes en tiempo real</h5>
        </div>
        <div className={styles['description']}>
          <div className={styles['item-tree']}>
            <div className={styles['icon']}>
              <Icon color="#00C27C" icon={'user-group'} size={45} />
            </div>
          </div>
          <h4>Aprende con expertos</h4>
          <h5>Dispuestos a compartir de su experiencia y conocimiento.</h5>
        </div>
      </div>
    </div>
  );
}

export default ContentDescription;
