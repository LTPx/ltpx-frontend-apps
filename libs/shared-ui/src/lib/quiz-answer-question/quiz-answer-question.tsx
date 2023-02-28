import TextArea from '../text-area/text-area';
import styles from './quiz-answer-question.module.scss';

/* eslint-disable-next-line */
export interface QuizAnswerQuestionProps {
  title: string;
  description?: string;

}

export function QuizAnswerQuestion(props: QuizAnswerQuestionProps) {
  const { title, description } = props;

  return (
    <div className={styles['container']}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="options">
        <TextArea placeholder='Cual es tu respuesta' rows={8} onChange={(s: any)=>{
          // console.log('hello', s.target.value);
        }}/>
      </div>
    </div>
  );
}

export default QuizAnswerQuestion;
