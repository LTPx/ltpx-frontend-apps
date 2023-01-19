import styles from './quiz-form-multiple-options.module.scss';
import { useState } from 'react';
import Icon from '../icon/icon';
import Input from '../input/input';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { generateAlphabet } from 'libs/api/src/lib/utils';
import Button, { ColorsButton, TypeButton } from '../button/button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { QuestionQuiz, TypeQuiz } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface QuizFormMultipleOptionsProps {
  singleSelection?: boolean;
  onSubmit?: (data: QuestionQuiz) => void;
  onCancel?: () => void;
}

export function QuizFormMultipleOptions(props: QuizFormMultipleOptionsProps) {
  const { onSubmit, onCancel, singleSelection } = props;
  const formik = useFormik({
    initialValues: {
      question: '',
      description: '',
      answers: [],
    },
    validationSchema: Yup.object({
      question: Yup.string().required('Pregunta es obligatorio'),
    }),
    onSubmit: (data) => {
      const elements = {...data, ...{ 
        answers: optionsForm,
        kind: singleSelection ? TypeQuiz.single : TypeQuiz.multiple 
      }}
      onSubmit && onSubmit(elements);
      onCancel && onCancel();
    },
  });
  const options = [
    {
      text: '',
      correct: false,
    },
    {
      text: '',
      correct: false,
    },
    {
      text: '',
      correct: false,
    },
  ];

  const [optionsForm, setOptionsForm] = useState(options);
  const alphabetLetters = generateAlphabet();

  const addNewForm = () => {
    setOptionsForm([
      ...optionsForm,
      {
        text: '',
        correct: false,
      },
    ]);
  };

  const removeForm = (index: number) => {
    const forms = [...optionsForm];
    forms.splice(index, 1);
    setOptionsForm(forms);
  };

  const handleInputChange = (
    e: { target: HTMLInputElement },
    index: number
  ) => {
    const { value } = e.target;
    const forms = [...optionsForm];
    forms[index].text = value;
    setOptionsForm(forms);
  };

  const markAsCorrect = (indexQuestion: number) => {
    if (singleSelection) {
      const forms = [...optionsForm];
      const result = forms.filter((form, i) => {
        return Object.assign(form, { correct: indexQuestion == i });
      });
      setOptionsForm(result);
    } else {
      const forms = [...optionsForm];
      forms[indexQuestion].correct = !forms[indexQuestion].correct;
      setOptionsForm(forms);
    }
  };

  const formClass = singleSelection ? `${styles['single']} ` : '';

  const QuestionsOptions = () => (
    <div className={styles['container']}>
      {optionsForm.map((option, index) => (
        <div className={`${styles['form']} ${formClass}`} key={index}>
          {!singleSelection && (
            <div className={styles['letter']}>
              <h2>{alphabetLetters[index]}.</h2>
            </div>
          )}
          <Input
            placeholder="Ingresa la respuesta"
            value={option.text}
            onChange={(e: { target: HTMLInputElement }) =>
              handleInputChange(e, index)
            }
            name="question"
          />
          <div
            className={`${styles['checker']} ${
              option.correct ? styles['check'] : ''
            }`}
            onClick={() => markAsCorrect(index)}
          >
            <Icon icon="check" size={15} />
            <h4>Marcar como correcta</h4>
          </div>
          <div className={styles['remove']} onClick={() => removeForm(index)}>
            X
          </div>
        </div>
      ))}
      <h5 className="muted" onClick={addNewForm}>
        + Agregar otra respuesta
      </h5>
      <div className={styles['footer']}>
        <Button
          title="Cancelar"
          color={ColorsButton.white}
          type={TypeButton.button}
          onClick={() => {
            onCancel && onCancel();
          }}
        />
        <Button
          title="Guardar"
          type={TypeButton.submit}
          onClick={formik.submitForm}
        />
      </div>
    </div>
  );

  return (
    <div className={styles['questions']}>
      <form>
        <Input
          label={`Pregunta`}
          placeholder="Formula tu pregunta"
          value={formik.values.question}
          onChange={(e: any) => {
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          name="question"
        />
        <Input
          label="Descripción (opcional)"
          name="description"
          placeholder="Alguna observación antes de responder esta pregunta"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </form>
      <QuestionsOptions />
    </div>
  );
}

export default QuizFormMultipleOptions;
