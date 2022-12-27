import { useState } from 'react';
import Icon from '../icon/icon';
import Input from '../input/input';
import styles from './conditional-question-quiz.module.scss';

/* eslint-disable-next-line */
export interface ConditionalQuestionQuizProps {}

export function ConditionalQuestionQuiz(props: ConditionalQuestionQuizProps) {
  const [answer, setAnswer] = useState('')
  const [conditionals, setConditionals] = useState([
    {
      correct: false,
      text: 'Verdadera'
    },
    {
      correct: false,
      text: 'Falso'
    }
  ])

  const markAsCorrect = (index: number) => {
    const forms = [...conditionals];
    const result = forms.filter((form, i)=> {
      return Object.assign(form, { correct: index == i})
    })
    setConditionals(result);
  }

  return (
    <div className={styles['container']}>
      <div className={styles['conditionals']}>
        { conditionals.map((conditional, index) => (
          <div className={styles['conditional-container']} key={index}>
            <h4 className={styles['conditional']}>
              {conditional.text}
            </h4>
            <h4 className={`${styles['checker']} ${ conditional.correct ? styles['check'] : ''}`}
              onClick={() => markAsCorrect(index)}
            >
              <Icon icon='check' size={15} />
              <h4>Marcar como correcta</h4>
            </h4>
          </div>
        ))}
      </div>
      <Input
        label='Respuesta correcta'
        placeholder='Respuesta correcta en caso que sea falsa'
        value={answer}
        onChange={(e: any) => setAnswer(e.target.value)}
        name='question'
      />
    </div>
  );
}

export default ConditionalQuestionQuiz;
