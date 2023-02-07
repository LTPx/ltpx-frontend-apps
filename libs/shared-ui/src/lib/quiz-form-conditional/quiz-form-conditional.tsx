import styles from './quiz-form-conditional.module.scss';
import Icon from '../icon/icon';
import Input from '../input/input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button, { ColorsButton, TypeButton } from '../button/button';
import { QuestionQuiz, TypeQuestionQuiz } from '@ltpx-frontend-apps/api';
import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface QuizFormConditionalProps {
  question?: QuestionQuiz;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

export function QuizFormConditional(props: QuizFormConditionalProps) {
  const { onSubmit, onCancel, question } = props;
  const { t } = useTranslation();

  const initialValues = {
    kind: TypeQuestionQuiz.conditional,
    question: question?.question || '',
    description: question?.description || '',
    answers: question?.answers || [
      {
        text: 'true',
        correct: false,
      },
      {
        text: 'false',
        correct: false,
      },
    ],
  };
  console.log('initialValues: ', initialValues);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      question: Yup.string().required('Pregunta es obligatorio'),
    }),
    onSubmit: (data) => {
      onSubmit && onSubmit(data);
    },
  });

  const markAsCorrect = (conditional: any) => {
    const { text, correct } = conditional;
    formik.setFieldValue(
      `answers[0].correct`,
      text === 'true' ? !correct : correct
    );
    formik.setFieldValue(
      `answers[1].correct`,
      text === 'true' ? correct : !correct
    );
  };

  return (
    <div className={styles['container']}>
      <form onSubmit={formik.handleSubmit}>
        <Input
          label={t('quizFormConditional.question') || ''}
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
          label={t('quizFormConditional.description') || ''}
          name="description"
          placeholder="Alguna observación antes de responder esta pregunta"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className={styles['conditionals']}>
          {formik.values.answers.map((conditional, index) => (
            <div className={styles['conditional-container']} key={index}>
              <h4 className={styles['conditional']}>
                {conditional.text === 'true'
                  ? t('quizFormConditional.true')
                  : t('quizFormConditional.false')}
              </h4>
              <div
                className={`${styles['checker']} ${
                  conditional.correct ? styles['check'] : ''
                }`}
                onClick={() => markAsCorrect(conditional)}
              >
                <Icon icon="check" size={15} />
                <h4>{t('quizFormConditional.correct')}</h4>
              </div>
            </div>
          ))}
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
            color={ColorsButton.secondary}
            type={TypeButton.submit}
          />
        </div>
      </form>
    </div>
  );
}

export default QuizFormConditional;
