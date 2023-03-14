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
  const [questionEdit, setQuestionEdit] = useState<QuestionQuiz>();
  const [selectedTypeQuestion, setSelectedTypeQuestion] =
    useState<TypeQuestionQuiz>();
  const { translateQuizCategories } = useCourseUtil();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const typeQuestions = [
    {
      text: 'Condicional',
      onClick: () => {
        setSelectedTypeQuestion(TypeQuestionQuiz.conditional);
        setOpen(true);
      },
    },
    {
      text: 'Selección Multiple',
      onClick: () => {
        setSelectedTypeQuestion(TypeQuestionQuiz.multiple);
        setOpen(true);
      },
    },
    {
      text: 'Una sola elección',
      onClick: () => {
        setSelectedTypeQuestion(TypeQuestionQuiz.single);
        setOpen(true);
      },
    },
    {
      text: 'Respuesta de usuario',
      onClick: () => {
        setSelectedTypeQuestion(TypeQuestionQuiz.answer);
        setOpen(true);
      },
    },
  ];
  const initialValues = {
    id: quiz?.id,
    name: quiz?.name || '',
    questions: quiz?.questions || [],
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

  const handleSaveQuestionData = (question: QuestionQuiz) => {
    const { questions } = formikForm.values;
    const totalQuestions = questions.concat([question]);
    formikForm.setFieldValue('questions', totalQuestions);
    setSelectedTypeQuestion(undefined);
  };

  const handleRemoveQuestion = (index: number) => {
    const { questions } = formikForm.values;
    const updatedQuestions = questions.filter((q, i) => i !== index);
    formikForm.setFieldValue('questions', updatedQuestions);
  };

  const handleUpdateQuestion = (question: QuestionQuiz, index: number) => {
    const { questions } = formikForm.values;
    const updatedQuestions = questions.map((q, i) =>
      i === index ? question : q
    );
    formikForm.setFieldValue('questions', updatedQuestions);
    setQuestionEdit(undefined);
    setSelectedTypeQuestion(undefined);
  };

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
                  setQuestionEdit(question);
                  // setSelectedIndexEdit(index);
                  setOpen(true);
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
      {!selectedTypeQuestion && formikForm.values.questions.length > 0 && (
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
              formikForm.handleSubmit();
            }}
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
        <ContentQuizForm questions={formikForm.values.questions} />
      </div>
      {open && (
        <Drawer
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <div className={styles['forms']}>
            <QuestionsQuiz
              type={
                selectedTypeQuestion ||
                questionEdit?.kind ||
                TypeQuestionQuiz.answer
              }
              question={questionEdit}
              onCancel={() => {
                setQuestionEdit(undefined);
                setOpen(false);
              }}
              onSubmit={(data) => {
                console.log('data: ', data);
                handleSaveQuestionData(data);
                // handleUpdateQuestion(data, 1);
                setQuestionEdit(undefined);
                setOpen(false);
              }}
            />
          </div>
        </Drawer>
      )}
    </div>
  );
}

export default QuizBuilder;
