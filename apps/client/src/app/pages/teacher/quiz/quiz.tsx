import { Button, ColorsButton, Input, MultipleOptionsQuiz, Select } from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import styles from './quiz.module.scss';

export enum Question {
  multiple = 'multiple',
  single = 'single',
  answer = 'answer',
}

export interface FormQuiz {
  question: string;
  description?: string;
  kindQuestion: Question;
}

const kindQuestion = [
  {value: Question.multiple, text: 'Seleccion multiple'},
  {value: Question.single, text: 'Una sola seleccion'},
  {value: Question.answer, text: 'Respuesta del estudiante'},
];

/* eslint-disable-next-line */
export interface QuizProps {}

export function Quiz(props: QuizProps) {

  const quizzes: FormQuiz[] = [
    {
      question: '',
      description: '',
      kindQuestion: Question.answer
    }
  ];

  const [quizForms, setQuizForms] = useState(quizzes);

  const addNewForm = () => {
    setQuizForms([...quizForms,     {
      question: '',
      description: '',
      kindQuestion: Question.answer
    }])
  }

  const handleInputChange = (e: { target: HTMLInputElement; }, index: number) => {
    const { name, value } = e.target;
    let forms = [...quizForms];
    if ( name === 'question') {
      forms[index][name] = value;
    }
    if ( name === 'description') {
      forms[index][name] = value;
    }
    setQuizForms(forms);
  };

  return (
    <div className="quizzes">
      <div className={styles['text']}>
        <h2>Test</h2>
        <h4 className='muted'>Los tests los tomara el estudiante</h4>
      </div>
      { quizForms.map((form, index)=> (
        <div className={styles['text']}>
          <Input
            label='Pregunta'
            placeholder='Formula tu pregunta'
            value={form.question}
            onChange={(e: { target: HTMLInputElement; }) => handleInputChange(e, index)}
            name='question'
          />
          <Input
            label='Description (optional)'
            placeholder='Alguna observacion antes de responder esta pregunta'
            value={form.description}
            onChange={(e: { target: HTMLInputElement; }) => handleInputChange(e, index)}
            name='description'
          />
          <Select
            label='Tipo de respuesta'
            options={kindQuestion}
          />
          <div className={styles['media']}>
            {/* <label>Agregar contenido multimedia</label> */}
          </div>
          <div className="gg">
            <MultipleOptionsQuiz/>
          </div>
        </div>
      ))}
      <Button
        title='+ Agregar otra seccion'
        onClick={addNewForm}
        color={ColorsButton.primary}
      />
    </div>
  );
}

export default Quiz;
