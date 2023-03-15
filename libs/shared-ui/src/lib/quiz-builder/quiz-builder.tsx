import styles from './quiz-builder.module.scss';
import {
  QuestionQuiz,
  QuizParamsUi,
  TypeQuestionQuiz,
} from '@ltpx-frontend-apps/api';
import {
  Drawer,
  Icon,
  Menu,
  QuizFormAnswer,
  QuizFormMultipleOptions,
  QuizQuestionView,
  Input,
  QuizFormConditional,
  Button,
  ColorsButton,
  TypeButton
} from '@ltpx-frontend-apps/shared-ui';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useCourseUtil } from 'libs/store/src';
import { useTranslation } from 'react-i18next';
import { useQuiz } from './useQuiz';
import * as Yup from 'yup';
/* eslint-disable-next-line */
export interface QuizBuilderProps {
  onClose?: () => void;
  onSubmit?: (data: QuizParamsUi) => void;
  className?: string;
  quiz?: QuizParamsUi;
}

export function QuizBuilder(props: QuizBuilderProps) {
  const { onClose, onSubmit, className, quiz } = props;
  const { translateQuizCategories } = useCourseUtil();
  const { t } = useTranslation();
  const {
    processQuestion,
    questions,
    setQuestions,
    typeQuestions,
    removeQuestion,
    currentQuestion,
    setCurrentQuestion,
    setSelectedIndex
  } = useQuiz();

  useEffect(() => {
    setQuestions(quiz?.questions || []);
  }, []);

  const initialValues = {
    id: quiz?.id,
    name: quiz?.name || '',
    questions: questions,
    total_questions_to_approved: quiz?.total_questions_to_approved || 1,
  };

  const formikForm = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Necesitas agregar un nombre'),
      total_questions_to_approved: Yup.number().required(
        'Necesitas definir el numero de preguntas'
      ),
    }),
    onSubmit: (quiz) => {
      onSubmit && onSubmit(quiz);
    },
  });

  const ContentQuizForm = ({ questions }: { questions: QuestionQuiz[] }) => (
    <div className={styles['questions']}>
      <label> {t('quizBuilder.questions')}</label>
      {questions.map((question, index) => (
        <div className={`${styles['question-wrapper']}`} key={index}>
          <QuizQuestionView
            key={index}
            question={question.question}
            number={index + 1}
            description={`${translateQuizCategories(question.kind)}`}
          >
            <div className={styles['actions']}>
              <div className={styles['action']}>
                {(100 / questions.length).toFixed()}pts
              </div>
              <div
                className={styles['action']}
                onClick={() => {
                  setCurrentQuestion(question);
                  setSelectedIndex(index);
                }}
              >
                <Icon icon="pencil" size={15} />
              </div>
              <div
                className={styles['action']}
                onClick={()=>{
                  setSelectedIndex(index);
                  removeQuestion();
                }}
              >
                <Icon icon="trash" size={15} />
              </div>
            </div>
          </QuizQuestionView>
          <div className={`${styles['question']}`}></div>
        </div>
      ))}
      <div className={styles['control-questions']}>
        <Menu items={typeQuestions}>
          <Button
            title={'Agregar Pregunta'}
            color={ColorsButton.secondary}
            icon="plus"
          />
        </Menu>
      </div>
      {questions.length > 0 && (
        <div className={styles['footer']}>
          <Button
            title="Cancelar"
            color={ColorsButton.white}
            onClick={() => {
              onClose && onClose();
            }}
          />
          <Button
            title={quiz?.id ? 'Actualizar Test' : 'Crear Test'}
            color={ColorsButton.secondary}
            type={TypeButton.submit}
            onClick={formikForm.handleSubmit}
          />
        </div>
      )}
    </div>
  );

  const QuestionsQuiz = ({
    type,
    onCancel,
    onSubmit,
    question,
  }: {
    type: TypeQuestionQuiz;
    onCancel: () => void;
    onSubmit: (data: QuestionQuiz) => void;
    question?: QuestionQuiz;
  }) => (
    <div className={styles['questions-quiz']}>
      {type === TypeQuestionQuiz.conditional && (
        <QuizFormConditional
          question={question}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      )}
      {type === TypeQuestionQuiz.multiple && (
        <QuizFormMultipleOptions
          question={question}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      )}
      {type === TypeQuestionQuiz.single && (
        <QuizFormMultipleOptions
          singleSelection={true}
          question={question}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      )}
      {type === TypeQuestionQuiz.answer && (
        <QuizFormAnswer
          question={question}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      )}
    </div>
  );

  return (
    <div className={styles['container']}>
      <div className={`${styles['content']} ${className}`}>
        <form className={styles['form']}>
          <Input
            label={t('quizBuilder.title') || ''}
            name="name"
            placeholder="Agrega un nombre"
            onChange={formikForm.handleChange}
            value={formikForm.values.name}
            onBlur={formikForm.handleBlur}
            errorMessage={formikForm.errors.name}
          />
          {/* <Input
            label={t('quizBuilder.score_to_approved') || ''}
            description={t('quizBuilder.tip') || ''}
            name="total_questions_to_approved"
            placeholder="Todas"
            type='number'
            onChange={formikForm.handleChange}
            value={formikForm.values.total_questions_to_approved}
            onBlur={formikForm.handleBlur}
            errorMessage={formikForm.errors.total_questions_to_approved}
          /> */}
        </form>
        <ContentQuizForm questions={questions} />
      </div>
      {currentQuestion && (
        <Drawer open={true}>
          <div className={styles['forms']}>
            <QuestionsQuiz
              type={currentQuestion.kind}
              question={currentQuestion}
              onCancel={() => {
                setCurrentQuestion(undefined);
              }}
              onSubmit={processQuestion}
            />
          </div>
        </Drawer>
      )}
    </div>
  );
}

export default QuizBuilder;
