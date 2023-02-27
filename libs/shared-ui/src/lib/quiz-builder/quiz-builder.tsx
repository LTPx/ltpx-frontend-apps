import {
  QuestionQuiz,
  QuizParamsUi,
  TypeQuestionQuiz,
} from '@ltpx-frontend-apps/api';
import {
  Icon,
  Menu,
  QuizFormAnswer,
  QuizFormMultipleOptions,
} from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import Button, { ColorsButton, TypeButton } from '../button/button';
import Input from '../input/input';
import QuizFormConditional from '../quiz-form-conditional/quiz-form-conditional';
import styles from './quiz-builder.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCourseUtil } from 'libs/store/src';
import { useTranslation } from 'react-i18next';
/* eslint-disable-next-line */
export interface QuizBuilderProps {
  onClose?: () => void;
  onSubmit?: (data: QuizParamsUi) => void;
  className?: string;
  quiz?: QuizParamsUi;
}

export function QuizBuilder(props: QuizBuilderProps) {
  const { onClose, onSubmit, className, quiz } = props;
  const [selectedIndexEdit, setSelectedIndexEdit] = useState<number>(1);
  const [questionEdit, setQuestionEdit] = useState<QuestionQuiz>();
  const [selectedTypeQuestion, setSelectedTypeQuestion] =
    useState<TypeQuestionQuiz>();
  const { translateQuizCategories } = useCourseUtil();
  const { t } = useTranslation();
  const type_question = [
    {
      text: 'Condicional',
      onClick: () => {
        setSelectedTypeQuestion(TypeQuestionQuiz.conditional);
      },
    },
    {
      text: 'Selección Multiple',
      onClick: () => {
        setSelectedTypeQuestion(TypeQuestionQuiz.multiple);
      },
    },
    {
      text: 'Una sola elección',
      onClick: () => {
        setSelectedTypeQuestion(TypeQuestionQuiz.single);
      },
    },
    {
      text: 'Respuesta de usuario',
      onClick: () => {
        setSelectedTypeQuestion(TypeQuestionQuiz.answer);
      },
    },
  ];
  const initialValues = {
    id: quiz?.id,
    name: quiz?.name || '',
    questions: quiz?.questions || [],
    total_questions_to_approved: quiz?.total_questions_to_approved || 1,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required('Necesitas agregar un nombre'),
      total_questions_to_approved: Yup.number().required('Necesitas definir el numero de preguntas'),
    }),
    onSubmit: (quiz) => {
      onSubmit && onSubmit(quiz);
    },
  });

  const handleSaveQuestionData = (question: QuestionQuiz) => {
    const { questions } = formik.values;
    const totalQuestions = questions.concat([question]);
    formik.setFieldValue('questions', totalQuestions);
    setSelectedTypeQuestion(undefined);
  };

  const cancelQuestion = () => {
    setSelectedTypeQuestion(undefined);
  };

  const handleRemoveQuestion = (index: number) => {
    const { questions } = formik.values;
    const updatedQuestions = questions.filter((q, i) => i !== index);
    formik.setFieldValue('questions', updatedQuestions);
  };

  const handleUpdateQuestion = (question: QuestionQuiz, index: number) => {
    const { questions } = formik.values;
    const updatedQuestions = questions.map((q, i) =>
      i === index ? question : q
    );
    formik.setFieldValue('questions', updatedQuestions);
    setQuestionEdit(undefined);
    setSelectedIndexEdit(-1);
    setSelectedTypeQuestion(undefined);
  };

  const ContentQuizForm = ({ questions }: { questions: QuestionQuiz[] }) => (
    <>
      <div className={styles['questions']}>
        <label> {t('quizBuilder.questions')}</label>
        {questions.map((question, index) => (
          <div className={`${styles['question-wrapper']}`} key={index}>
            <div className={`${styles['question']}`}>
              <div className={styles['summary']}>
                <div className={styles['number']}>{index + 1}</div>
                <div className={styles['text']}>
                  <h4>{question.question}</h4>
                  <h5>{translateQuizCategories(question.kind)}</h5>
                </div>
              </div>
              <div className={styles['actions']}>
                <div
                  className={styles['action']}
                  onClick={() => {
                    setQuestionEdit(question);
                    setSelectedIndexEdit(index);
                  }}
                >
                  <Icon icon="pencil" size={15} />
                </div>
                <div
                  className={styles['action']}
                  onClick={() => {
                    handleRemoveQuestion(index);
                  }}
                >
                  <Icon icon="trash" size={15} />
                </div>
              </div>
            </div>
            {questionEdit && selectedIndexEdit === index && (
              <div className={styles['question-edit-form']}>
                <QuestionsQuiz
                  question={question}
                  type={question.kind}
                  onCancel={() => {
                    setSelectedIndexEdit(-1);
                    setQuestionEdit(undefined);
                  }}
                  onSubmit={(data) => {
                    handleUpdateQuestion(data, index);
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedTypeQuestion && !questionEdit && (
        <div className={styles['forms']}>
          <QuestionsQuiz
            type={selectedTypeQuestion}
            onCancel={cancelQuestion}
            onSubmit={(data) => {
              handleSaveQuestionData(data);
            }}
          />
        </div>
      )}
      {!selectedTypeQuestion && (
        <div className={styles['control-questions']}>
          <Menu items={type_question}>
            <Button title={'Agregar Pregunta'}
            color={ColorsButton.secondary}
            icon='plus'/>
          </Menu>
        </div>
      )}
      {!selectedTypeQuestion && formik.values.questions.length > 0 && (
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
            onClick={() => {
              formik.handleSubmit();
            }}
          />
        </div>
      )}
    </>
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
          onSubmit={(data) => {
            onSubmit(data);
          }}
          onCancel={onCancel}
        />
      )}
      {type === TypeQuestionQuiz.multiple && (
        <QuizFormMultipleOptions
          question={question}
          onSubmit={(data) => {
            onSubmit(data);
          }}
          onCancel={onCancel}
        />
      )}
      {type === TypeQuestionQuiz.single && (
        <QuizFormMultipleOptions
          question={question}
          singleSelection={true}
          onSubmit={(data) => {
            onSubmit(data);
          }}
          onCancel={onCancel}
        />
      )}
      {type === TypeQuestionQuiz.answer && (
        <QuizFormAnswer
          question={question}
          onSubmit={(data) => {
            onSubmit(data);
          }}
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
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.name}
          />
          <Input
            label={t('quizBuilder.total_questions_to_approved') || ''}
            description={t('quizBuilder.tip') || ''}
            name="total_questions_to_approved"
            placeholder="Todas"
            type='number'
            onChange={formik.handleChange}
            value={formik.values.total_questions_to_approved}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.total_questions_to_approved}
          />
        </form>
        <ContentQuizForm questions={formik.values.questions} />
      </div>
    </div>
  );
}

export default QuizBuilder;
