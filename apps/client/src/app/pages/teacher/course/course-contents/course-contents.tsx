import { Input } from '@ltpx-frontend-apps/shared-ui';
import styles from './course-contents.module.scss';

/* eslint-disable-next-line */
export interface CourseContentsProps {}

export function CourseContents(props: CourseContentsProps) {
  return (
    <div className="contents">
      <div className={styles['text']}>
        <h2>Contenidos</h2>
        <h4 className='muted'>Los contenidos que se impartiran en el desarrollo del curso</h4>
      </div>
      <div className={styles['text']}>
        <Input placeholder='Ejm: Introduccion' label='Titulo de esta seccion'/>
        <Input placeholder='Un breve resumen de lo que trata este curso' label='Texto de esta seccion'/>
        <div className={styles['media']}>
          <label>Agregar contenido multimedia</label>
        </div>
      </div>
      <span>+ Agregar otra seccion</span>
    </div>
  );
}

export default CourseContents;
