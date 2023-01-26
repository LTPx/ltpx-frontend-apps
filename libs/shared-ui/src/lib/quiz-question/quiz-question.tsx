import { TypeQuestionQuiz } from '@ltpx-frontend-apps/api';
import { useState } from 'react';
import MultipleOptionsQuiz from '../multiple-options-quiz/multiple-options-quiz';
import QuizFormConditional from '../quiz-form-conditional/quiz-form-conditional';
import Select from '../select/select';
import styles from './quiz-question.module.scss';

/* eslint-disable-next-line */
export interface QuizQuestionProps {
  kindQuestion: TypeQuestionQuiz;
  onChange: (option: any) => void;
}

const options = [
  { value: TypeQuestionQuiz.multiple, text: 'Selección multiple' },
  { value: TypeQuestionQuiz.single, text: 'Una sola selección' },
  { value: TypeQuestionQuiz.answer, text: 'Respuesta del estudiante' },
  { value: TypeQuestionQuiz.conditional, text: 'Verdadera o falsa' },
];

export function QuizQuestion(props: QuizQuestionProps) {
  const { kindQuestion, onChange } = props;
  const [selectedQuestion, setSelectedQuestion] = useState(TypeQuestionQuiz.answer);

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
      {selectedQuestion === TypeQuestionQuiz.multiple && <MultipleOptionsQuiz />}
      {selectedQuestion === TypeQuestionQuiz.single && (
        <MultipleOptionsQuiz singleSelection={true} />
      )}
      {selectedQuestion === TypeQuestionQuiz.conditional && <QuizFormConditional />}
      {selectedQuestion === TypeQuestionQuiz.answer && (
        <h5 className={styles['text']}>
          Al estudiante le aparecerá un campo de texto para responder esta
          pregunta
        </h5>
      )}
    </div>
  );
}

export default QuizQuestion;
