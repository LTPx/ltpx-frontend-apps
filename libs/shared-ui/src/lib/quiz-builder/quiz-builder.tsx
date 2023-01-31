import {
  QuestionQuiz,
  QuizParamsUi,
  TypeQuestionQuiz,
} from '@ltpx-frontend-apps/api';
import {
  Dropdown,
  Icon,
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

  const initialValues = {
    id: quiz?.id,
    name: quiz?.name || '',
    questions: quiz?.questions || [],
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required('Necesitas agregar un nombre'),
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
        <label> Preguntas</label>
        {questions.map((question, index) => (
          <div className={`${styles['question-wrapper']}`} key={index}>
            <div className={`${styles['question']}`}>
              <div className={styles['summary']}>
                <div className={styles['number']}>{index + 1}</div>
                <div className={styles['text']}>
                  <h4>{question.question}</h4>
                  <h5>{question.kind}</h5>
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
      {selectedTypeQuestion && (
        <div className={styles['forms']}>
          {selectedTypeQuestion && !questionEdit && (
            <QuestionsQuiz
              question={questionEdit}
              type={selectedTypeQuestion}
              onCancel={cancelQuestion}
              onSubmit={(data) => {
                handleSaveQuestionData(data);
              }}
            />
          )}
        </div>
      )}
      {!selectedTypeQuestion && (
        <div className={styles['control-questions']}>
          <Dropdown>
            <div className={styles['select-questions']}>
              <h4>Nueva Pregunta</h4>
              <Icon icon="caret-down" size={18} />
            </div>
            <div className={`${styles['menu']} card`}>
              <div
                className={styles['menu-option']}
                onClick={() => {
                  setSelectedTypeQuestion(TypeQuestionQuiz.conditional);
                }}
              >
                Condicional
              </div>
              <div
                className={styles['menu-option']}
                onClick={() => {
                  setSelectedTypeQuestion(TypeQuestionQuiz.multiple);
                }}
              >
                Selección Multiple
              </div>
              <div
                className={styles['menu-option']}
                onClick={() => {
                  setSelectedTypeQuestion(TypeQuestionQuiz.single);
                }}
              >
                Una sola elección
              </div>
              <div
                className={styles['menu-option']}
                onClick={() => {
                  setSelectedTypeQuestion(TypeQuestionQuiz.answer);
                }}
              >
                Respuesta de usuario
              </div>
            </div>
          </Dropdown>
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
            label="Nombre del test"
            name="name"
            placeholder="Agrega un nombre"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.name}
          />
        </form>
        <ContentQuizForm questions={formik.values.questions} />
      </div>
    </div>
  );
}

export default QuizBuilder;
