import styles from './quiz-form-answer.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../input/input';
import Button, { ColorsButton, TypeButton } from '../button/button';
import { QuestionQuiz, TypeQuestionQuiz } from '@ltpx-frontend-apps/api';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface QuizFormAnswerProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  question?: QuestionQuiz;
}

export function QuizFormAnswer(props: QuizFormAnswerProps) {
  const { onSubmit, onCancel, question } = props;
  const { t } = useTranslation();
  const initialValues = {
    id: question?.id,
    kind: TypeQuestionQuiz.answer,
    question: question?.question || '',
    description: question?.description || '',
    points: question?.points || 1,
    answers_attributes: [
      {
        text: '',
        correct: false,
      },
    ],
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      question: Yup.string().required('Pregunta es obligatorio'),
      points: Yup.number()
      .required('Necesitas agregar puntos')
      .min(1, 'El valor debe ser mayor a 0')
      .max(100, 'El valor debe ser menor o igual a 100'),
    }),
    onSubmit: (data) => {
      onSubmit && onSubmit(data);
      onCancel && onCancel();
    },
  });

  return (
    <div className={styles['container']}>
      <form className={styles['form-quiz-answer']} onSubmit={formik.handleSubmit}>
        <div className={styles['quiz-answer']}>
          <Input
            label={t('quizFormAnswer.question') || ''}
            placeholder="Formula tu pregunta"
            value={formik.values.question}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="question"
            errorMessage={formik.errors.question}
          />
          <Input
            label={t('quizFormAnswer.description') || ''}
            name="description"
            placeholder="Alguna observación antes de responder esta pregunta"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Input
            label={t('quizFormConditional.points') || ''}
            name="points"
            type="number"
            value={formik.values.points}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.points}
          />
          <h5 className={styles['text']}>{t('quizFormAnswer.text')}</h5>
        </div>
        <div className={styles['footer']}>
          <Button
            title={t('buttons.cancel')}
            color={ColorsButton.white}
            type={TypeButton.button}
            onClick={() => {
              onCancel && onCancel();
            }}
          />
          <Button
            title={
              question?.question
                ? t('buttons.updateQuestion')
                : t('buttons.addQuestion')
            }
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
