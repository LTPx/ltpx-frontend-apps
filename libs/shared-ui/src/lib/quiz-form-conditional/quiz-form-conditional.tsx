import styles from './quiz-form-conditional.module.scss';
import Icon from '../icon/icon';
import Input from '../input/input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button, { ColorsButton, TypeButton } from '../button/button';
import { QuestionQuiz, TypeQuestionQuiz } from '@ltpx-frontend-apps/api';
import { useTranslation } from 'react-i18next';
import InputTextStatus, {
  StatusInputText,
} from '../input-text-status/input-text-status';

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
    id: question?.id,
    kind: TypeQuestionQuiz.conditional,
    question: question?.question || '',
    description: question?.description || '',
    points: question?.points || '',
    answers_attributes: question?.answers_attributes || [
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
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      question: Yup.string().required('Pregunta es obligatorio'),
      points: Yup.number()
        .required('Necesitas agregar puntos')
        .min(1, 'El valor debe ser mayor a 0')
        .max(100, 'El valor debe ser menor o igual a 100'),
      answers_attributes: Yup.array()
        .of(
          Yup.object().shape({
            text: Yup.string().required(
              'Debes ingresar el texto de la respuesta'
            ),
            correct: Yup.boolean(),
          })
        )
        .min(2, 'Debes ingresar al menos dos respuestas')
        .test(
          'at-least-one-correct',
          'Debes marcar al menos una respuesta como correcta',
          (value) => {
            if (!value) return false;
            return value.some((answer) => answer.correct);
          }
        ),
    }),
    onSubmit: (data) => {
      onSubmit && onSubmit(data);
    },
  });

  const markAsCorrect = (conditional: any) => {
    const { text, correct } = conditional;
    const updatedAnswers = formik.values.answers_attributes.map(
      (answer: any) => {
        if (answer.text === text) {
          return {
            ...answer,
            correct: true,
          };
        } else {
          return {
            ...answer,
            correct: false,
          };
        }
      }
    );
    formik.setFieldValue('answers_attributes', updatedAnswers);
  };

  return (
    <div className={styles['container']}>
      <form
        className={styles['form-quiz-conditional']}
        onSubmit={formik.handleSubmit}
      >
        <div>
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
          <Input
            label={t('quizFormConditional.points') || ''}
            name="points"
            type="number"
            value={formik.values.points}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.points}
          />
          <div className={styles['conditionals']}>
            {formik.values.answers_attributes.map((conditional, index) => (
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
          <InputTextStatus
            status={StatusInputText.error}
            text={
              typeof formik.errors.answers_attributes === 'string'
                ? formik.errors.answers_attributes
                : ''
            }
          />
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
