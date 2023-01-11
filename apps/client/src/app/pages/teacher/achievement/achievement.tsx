
import { Input, Select, SelectedItems } from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import styles from './achievement.module.scss';

const achievementsRule = [
  {value: 'by-quiz', text: 'El estudiante completo un test'},
  {value: 'by-quizzes', text: 'El estudiante completo varios test'},
  {value: 'by-quiz-score', text: 'El estudiante alcanzo un nota especifica en un test'},
  {value: 'by-content', text: 'El estudiante completo un contenido'},
  {value: 'by-activity', text: 'El estudiante realizo alguna actividad'},
];

const quizzes = [
  {text: 'Test: La Tierra y el Universo'},
  {text: 'Test: Via Láctea'},
  {text: 'Test: Las estrellas'},
];

const contents = [
  {text: 'Contenido: La Tierra'},
  {text: 'Contenido: El Cosmo'},
  {text: 'Contenido: El Sol'},
  {text: 'Contenido: La Luna'},
  {text: 'Contenido: El Espacio'},
  {text: 'Contenido: La Galaxia '},
  {text: 'Contenido: El Sol y sus principios'},
  {text: 'Contenido: La Luna y su influencia en el mar'},
  {text: 'Contenido: El Espacio como combustible'},
  {text: 'Contenido: Los agujeros negros y sus peligros'},
];

/* eslint-disable-next-line */
export interface AchievementProps {}

export function Achievement(props: AchievementProps) {
  const [selectedRule, setSelectedRule] = useState(achievementsRule[0]);

  const showDataOptions = (selectedOption: any) => {
    if (selectedOption) {
      setSelectedRule(selectedOption);
    }
  }

  return (
    <div className="achievements">
      <div className={styles['header-text']}>
        <h2>Logros</h2>
        <h4 className='muted'>El estudiante alcanzara logros al superar ciertas reglas</h4>
      </div>
      <div className={styles['achievement-form']}>
        <Input placeholder='Asigna un nombre interesante' label='Titulo del logro'/>
        <Select options={achievementsRule}
          label='Tipo de regla'
          onChange={showDataOptions}
        />
        <div className={styles['contents']}>
          { selectedRule.value === 'by-quiz' && (
            <SelectedItems
              items={quizzes}
              onlyOneSelection={true}
            />
          )}
          { selectedRule.value === 'by-quizzes' && (
            <SelectedItems
              items={quizzes}
              onlyOneSelection={false}
            />
          )}
          { selectedRule.value === 'by-quiz-score' && (
            <SelectedItems
              items={quizzes}
              onlyOneSelection={true}
            />
          )}
          { selectedRule.value === 'by-content' && (
            <SelectedItems
              items={contents}
              onlyOneSelection={true}
            />
          )}
          { selectedRule.value === 'by-activity' && (
            <h4>Nothing yet</h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default Achievement;
