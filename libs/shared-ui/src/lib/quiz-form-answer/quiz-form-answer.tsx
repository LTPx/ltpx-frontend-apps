import styles from './quiz-form-answer.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../input/input';
import Button, { ColorsButton, TypeButton } from '../button/button';
import { QuestionQuiz, TypeQuestionQuiz } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface QuizFormAnswerProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  question?: QuestionQuiz;
}

export function QuizFormAnswer(props: QuizFormAnswerProps) {
  const { onSubmit, onCancel, question } = props;
  const initialValues = {
    kind: TypeQuestionQuiz.answer,
    question: question?.question || '',
    description: question?.description || '',
    answers: [],
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      question: Yup.string().required('Pregunta es obligatorio'),
    }),
    onSubmit: (data) => {
      onSubmit && onSubmit(data);
      onCancel && onCancel();
    },
  });

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
        />
        <Input
          label="Descripción (opcional)"
          name="description"
          placeholder="Alguna observación antes de responder esta pregunta"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <h5 className={styles['text']}>
          Al estudiante le aparecerá un campo de texto para responder esta
          pregunta
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
            title="Agregar pregunta"
            type={TypeButton.submit}
            onClick={formik.submitForm}
            color={ColorsButton.secondary}
          />
        </div>
      </form>
    </div>
  );
}

export default QuizFormAnswer;
