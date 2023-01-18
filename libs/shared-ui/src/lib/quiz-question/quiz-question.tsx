import { TypeQuiz } from '@ltpx-frontend-apps/api';
import { useState } from 'react';
import MultipleOptionsQuiz from '../multiple-options-quiz/multiple-options-quiz';
import QuizFormConditional from '../quiz-form-conditional/quiz-form-conditional';
import Select from '../select/select';
import styles from './quiz-question.module.scss';

/* eslint-disable-next-line */
export interface QuizQuestionProps {
  kindQuestion: TypeQuiz;
  onChange: (option: any) => void;
}

const options = [
  { value: TypeQuiz.multiple, text: 'Selección multiple' },
  { value: TypeQuiz.single, text: 'Una sola selección' },
  { value: TypeQuiz.answer, text: 'Respuesta del estudiante' },
  { value: TypeQuiz.conditional, text: 'Verdadera o falsa' },
];

export function QuizQuestion(props: QuizQuestionProps) {
  const { kindQuestion, onChange } = props;
  const [selectedQuestion, setSelectedQuestion] = useState(TypeQuiz.answer);

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
      {selectedQuestion === TypeQuiz.multiple && <MultipleOptionsQuiz />}
      {selectedQuestion === TypeQuiz.single && (
        <MultipleOptionsQuiz singleSelection={true} />
      )}
      {selectedQuestion === TypeQuiz.conditional && <QuizFormConditional />}
      {selectedQuestion === TypeQuiz.answer && (
        <h5 className={styles['text']}>
          Al estudiante le aparecerá un campo de texto para responder esta
          pregunta
        </h5>
      )}
    </div>
  );
}

export default QuizQuestion;
