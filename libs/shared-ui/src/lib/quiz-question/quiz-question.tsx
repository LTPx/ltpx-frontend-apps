import { useState } from 'react';
import ConditionalQuestionQuiz from '../conditional-question-quiz/conditional-question-quiz';
import MultipleOptionsQuiz from '../multiple-options-quiz/multiple-options-quiz';
import Select from '../select/select';
import styles from './quiz-question.module.scss';

export enum Question {
  multiple = 'multiple',
  single = 'single',
  answer = 'answer',
  conditional = 'conditional',
}
/* eslint-disable-next-line */
export interface QuizQuestionProps {
  kindQuestion: Question;
  onChange: (option: any) => void;
}

const options = [
  { value: Question.multiple, text: 'Selección multiple' },
  { value: Question.single, text: 'Una sola selección' },
  { value: Question.answer, text: 'Respuesta del estudiante' },
  { value: Question.conditional, text: 'Verdadera o falsa' },
];

export function QuizQuestion(props: QuizQuestionProps) {
  const { kindQuestion, onChange } = props;
  const [selectedQuestion, setSelectedQuestion] = useState(Question.answer);

  const showQuestionForm = (selectedOption: any) => {
    if (selectedOption) {
      setSelectedQuestion(selectedOption.value);
      onChange(selectedOption.value);
    }
  };
  return (
    <div className={styles['questions-container']}>
      <Select
        label="Seleccione tipo de respuesta"
        options={options}
        onChange={showQuestionForm}
        selected={options[2]}
      />
      {selectedQuestion === Question.multiple && <MultipleOptionsQuiz />}
      {selectedQuestion === Question.single && (
        <MultipleOptionsQuiz singleSelection={true} />
      )}
      {selectedQuestion === Question.conditional && <ConditionalQuestionQuiz />}
      {selectedQuestion === Question.answer && (
        <h5 className={styles['text']}>
          Al estudiante le aparecerá un campo de texto para responder esta
          pregunta
        </h5>
      )}
    </div>
  );
}

export default QuizQuestion;
