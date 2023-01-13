import Loader from '../loader/loader';
import styles from './loader-page.module.scss';

/* eslint-disable-next-line */
export interface LoaderPageProps { }

export function LoaderPage(props: LoaderPageProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <Loader />
        <h3>Cargando...</h3>
        <h4>Esto tomara unos segundos</h4>
      </div>
    </div>
  );
}

export default LoaderPage;
