import { Input, Select } from '@ltpx-frontend-apps/shared-ui';
import styles from './achievement.module.scss';

const achievementsRule = [
  {value: 'by-quiz', text: 'El estudiante completo un test'},
  {value: 'by-quiz', text: 'El estudiante alcanzo un nota especifica en un test'},
  {value: 'by-quiz', text: 'El estudiante completo un test'},
  {value: 'by-lesson', text: 'El estudiante completo una leccion'},
  {value: 'by-activity', text: 'El estudiante realizo alguna actividad'},
];

/* eslint-disable-next-line */
export interface AchievementProps {}

export function Achievement(props: AchievementProps) {
  return (
    <div className="achievements">
      <div className={styles['text']}>
        <h2>Logros</h2>
        <h4 className='muted'>El estudiante alcanzara logros al superar ciertas reglas</h4>
      </div>
      <div className={styles['text']}>
        <Input placeholder='Asigna un nombre interesante' label='Titulo del logro'/>
        <Select options={achievementsRule} label='Tipo de regla'/>
        <div className={styles['media']}>
          <label>Agregar contenido multimedia</label>
        </div>
      </div>
    </div>
  );
}

export default Achievement;
