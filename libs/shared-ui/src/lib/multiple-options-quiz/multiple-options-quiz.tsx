import { useState } from 'react';
import Icon from '../icon/icon';
import Input from '../input/input';
import styles from './multiple-options-quiz.module.scss';

/* eslint-disable-next-line */
export interface MultipleOption {
  question: string;
  correct: boolean;
}

export interface MultipleOptionsQuizProps {}

export function MultipleOptionsQuiz(props: MultipleOptionsQuizProps) {
  const options: MultipleOption[] = [
    {
      question: '',
      correct: false,
    }
  ];

  const [optionsForm, setOptionsForm] = useState(options);

  const addNewForm = () => {
    setOptionsForm([...optionsForm,     {
      question: '',
      correct: false,
    }])
  }

  const removeForm = (index: number) => {
    const forms = [...optionsForm];
    forms.splice(index, 1);
    setOptionsForm(forms);
  }


  const handleInputChange = (e: { target: HTMLInputElement; }, index: number) => {
    const { value } = e.target;
    let forms = [...optionsForm];
    forms[index].question = value;
    setOptionsForm(forms);
  };

  return (
    <div className={styles['container']}>
      { optionsForm.map((option, index) => (
        <div className={styles['form']} key={index}>
          <Input
            placeholder='Ingresa la respuesta'
            value={option.question}
            onChange={(e: { target: HTMLInputElement; }) => handleInputChange(e, index)}
            name='question'
          />
          <div className={`${styles['checker']} ${ option.correct ? styles['check'] : ''}`}>
            <Icon icon='check' size={15} />
            <h4>Marcar como correcta</h4>
          </div>
          <div className={styles['remove']} onClick={() => removeForm(index)}>
            X
          </div>
        </div>
      ))}
      <h5 className='muted' onClick={addNewForm}>
        + Agregar Nueva Respuesta
      </h5>
    </div>
  );
}

export default MultipleOptionsQuiz;
