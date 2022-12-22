import { Button, ColorsButton, Input, Question, QuizQuestion } from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import styles from './quiz.module.scss';

export interface FormQuiz {
  question: string;
  description?: string;
  kindQuestion: Question;
}

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
      <div className={styles['header-text']}>
        <h2>Test</h2>
        <h4 className='muted'>Los tests los tomara el estudiante</h4>
      </div>
      { quizForms.map((form, index)=> (
        <div className={styles['quiz-form']} key={index}>
          <Input
            label='Pregunta'
            placeholder='Formula tu pregunta'
            value={form.question}
            onChange={(e: { target: HTMLInputElement; }) => handleInputChange(e, index)}
            name='question'
          />
          <Input
            label='Descripcion (opcional)'
            placeholder='Alguna observacion antes de responder esta pregunta'
            value={form.description}
            onChange={(e: { target: HTMLInputElement; }) => handleInputChange(e, index)}
            name='description'
          />
          <div className={styles['quiz-question']}>
            <QuizQuestion kindQuestion={Question.answer}/>
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
