import { Input, Select } from '@ltpx-frontend-apps/shared-ui';
import styles from './quiz.module.scss';

const kindQuestion = [
  {value: 'multiselect', text: 'Seleccion multiple'},
  {value: 'singleselect', text: 'Una sola seleccion'},
  {value: 'answer', text: 'Respuesta del estudiante'},
];

/* eslint-disable-next-line */
export interface QuizProps {}

export function Quiz(props: QuizProps) {
  return (
    <div className="quizzes">
      <div className={styles['text']}>
        <h2>Test</h2>
        <h4 className='muted'>Los tests los tomara el estudiante</h4>
      </div>
      <div className={styles['text']}>
        <Input placeholder='Formula tu pregunta' label='Pregunta'/>
        <Input placeholder='Alguna observacion antes de responder esta pregunta' label='Description (optional)'/>
        <Select options={kindQuestion} label='Tipo de respuesta'/>
        <div className={styles['media']}>
          <label>Agregar contenido multimedia</label>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
