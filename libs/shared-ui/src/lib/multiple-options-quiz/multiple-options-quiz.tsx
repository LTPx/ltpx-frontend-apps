import { useState } from 'react';
import Icon from '../icon/icon';
import Input from '../input/input';
import styles from './multiple-options-quiz.module.scss';

/* eslint-disable-next-line */
export interface MultipleOption {
  question: string;
  correct: boolean;
}

export interface MultipleOptionsQuizProps {
  singleSelection?: boolean;
}

export function MultipleOptionsQuiz(props: MultipleOptionsQuizProps) {
  const { singleSelection } = props;
  const options: MultipleOption[] = [
    {
      question: '',
      correct: false,
    },
    {
      question: '',
      correct: false,
    },
    {
      question: '',
      correct: false,
    },
  ];

  const [optionsForm, setOptionsForm] = useState(options);
  const [indexSelected, setIndexSelected] = useState(-1);

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

  const markAsCorrect = (indexQuestion: number) => {
    if (singleSelection) {
      let forms = [...optionsForm];
      let result = forms.filter((form, i)=> {
        return Object.assign(form, { correct: indexQuestion == i})
      })
      setOptionsForm(result);
    }else {
      let forms = [...optionsForm];
      forms[indexQuestion].correct = !forms[indexQuestion].correct;
      setOptionsForm(forms);
    };
  }

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
          <div className={`${styles['checker']} ${ option.correct ? styles['check'] : ''}`}
            onClick={() => markAsCorrect(index)}
          >
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
