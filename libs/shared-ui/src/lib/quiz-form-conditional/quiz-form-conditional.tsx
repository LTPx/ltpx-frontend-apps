import styles from './quiz-form-conditional.module.scss';
import { useState } from 'react';
import Icon from '../icon/icon';
import Input from '../input/input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button, { ColorsButton, TypeButton } from '../button/button';
import { TypeQuiz } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface QuizFormConditionalProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

export function QuizFormConditional(props: QuizFormConditionalProps) {
  const { onSubmit, onCancel } = props;
  const formik = useFormik({
    initialValues: {
      question: '',
      description: '',
      kind: TypeQuiz.conditional,
      true: false,
      false: false,
      answer: '',
    },
    validationSchema: Yup.object({
      question: Yup.string().required('Pregunta es obligatorio'),
    }),
    onSubmit: (data) => {
      const ll = {
        ...data,
        ...{
          answers: [
            {
              text: 'true',
              correct: data.true
            },
            {
              text: 'false',
              correct: data.false
            }
          ]
        },
      };
      onSubmit && onSubmit(ll);
    },
  });
  const conditionals = [
    {
      correct: formik.values.true,
      text: 'Verdadera',
      isTrue: true,
    },
    {
      correct: formik.values.false,
      text: 'Falso',
      isTrue: false,
    },
  ];

  const markAsCorrect = (conditional: any) => {
    if (conditional.isTrue) {
      formik.setFieldValue('true', !conditional.correct);
      formik.setFieldValue('false', conditional.correct);
    } else {
      formik.setFieldValue('false', !conditional.correct);
      formik.setFieldValue('true', conditional.correct);
    }
  };

  return (
    <div className={styles['container']}>
      <form onSubmit={formik.handleSubmit}>
        <Input
          label={`Pregunta`}
          placeholder="Formula tu pregunta"
          value={formik.values.question}
          onChange={(e: any) => {
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          name="question"
          errorMessage={formik.errors.question}
        />
        <Input
          label="Descripción (opcional)"
          name="description"
          placeholder="Alguna observación antes de responder esta pregunta"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className={styles['conditionals']}>
          {conditionals.map((conditional, index) => (
            <div className={styles['conditional-container']} key={index}>
              <h4 className={styles['conditional']}>{conditional.text}</h4>
              <div
                className={`${styles['checker']} ${
                  conditional.correct ? styles['check'] : ''
                }`}
                onClick={() => markAsCorrect(conditional)}
              >
                <Icon icon="check" size={15} />
                <h4>correcta</h4>
              </div>
            </div>
          ))}
        </div>
        <Input
          label="Respuesta correcta"
          placeholder="Respuesta correcta en caso que sea falsa"
          name="answer"
          value={formik.values.answer}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className={styles['footer']}>
          <Button
            title="Cancelar"
            color={ColorsButton.white}
            type={TypeButton.button}
            onClick={() => {
              onCancel && onCancel();
            }}
          />
          <Button title="Guardar" type={TypeButton.submit} />
        </div>
      </form>
    </div>
  );
}

export default QuizFormConditional;
