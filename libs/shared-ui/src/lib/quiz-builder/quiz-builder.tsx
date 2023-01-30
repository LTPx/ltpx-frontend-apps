import {
  EditQuizParams,
  NewQuizParams,
  QuestionQuiz,
  QuizModel,
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
  onSubmit?: (data: NewQuizParams | EditQuizParams) => void;
  className?: string;
  quiz?: QuizModel;
}

export function QuizBuilder(props: QuizBuilderProps) {
  const { onClose, onSubmit, className, quiz } = props;
  const [selectedTypeQuestion, setSelectedTypeQuestion] =
    useState<TypeQuestionQuiz | null>();

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
    onSubmit: (quiz: NewQuizParams | EditQuizParams) => {
      onSubmit && onSubmit(quiz);
    },
  });

  const editQuestion = (index: number) => {
    // console.log(questions[index]);
  };

  const handleSaveQuestionData = (question: QuestionQuiz) => {
    const { questions } = formik.values;
    const totalQuestions = questions.concat([question]);
    formik.setFieldValue('questions', totalQuestions);
    setSelectedTypeQuestion(null);
  };

  const cancelQuestion = () => {
    setSelectedTypeQuestion(null);
  };

  const ContentQuizForm = () => (
    <>
      <div className={styles['questions']}>
        <label> Preguntas</label>
        {formik.values.questions.map((question, index) => (
          <div
            className={`${styles['question']} ${
              index === formik.values.questions.length ? styles['selected'] : ''
            }`}
            key={index}
            onClick={() => {
              editQuestion(index);
            }}
          >
            <div className={styles['number']}>{index + 1}</div>
            <div className={styles['text']}>
              <h4>{question.question}</h4>
              <h5>{question.kind}</h5>
            </div>
          </div>
        ))}
      </div>
      {selectedTypeQuestion && (
        <div className={styles['forms']}>
          {selectedTypeQuestion && <QuestionsQuiz />}
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
            title={quiz?.id ? "Actualizar Test" : "Crear Test"}
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

  const QuestionsQuiz = () => (
    <div className={styles['questions-quiz']}>
      {selectedTypeQuestion === TypeQuestionQuiz.conditional && (
        <QuizFormConditional
          onSubmit={(data) => {
            handleSaveQuestionData(data);
          }}
          onCancel={() => {
            cancelQuestion();
          }}
        />
      )}
      {selectedTypeQuestion === TypeQuestionQuiz.multiple && (
        <QuizFormMultipleOptions
          onSubmit={(data) => {
            handleSaveQuestionData(data);
          }}
          onCancel={() => {
            cancelQuestion();
          }}
        />
      )}
      {selectedTypeQuestion === TypeQuestionQuiz.single && (
        <QuizFormMultipleOptions
          singleSelection={true}
          onSubmit={(data) => {
            handleSaveQuestionData(data);
          }}
          onCancel={() => {
            cancelQuestion();
          }}
        />
      )}
      {selectedTypeQuestion === TypeQuestionQuiz.answer && (
        <QuizFormAnswer
          onSubmit={(data) => {
            handleSaveQuestionData(data);
          }}
          onCancel={() => {
            cancelQuestion();
          }}
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
        <ContentQuizForm />
      </div>
    </div>
  );
}

export default QuizBuilder;
