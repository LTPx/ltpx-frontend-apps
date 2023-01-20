import {
  NewQuizParams,
  QuestionQuiz,
  QuizModel,
  TypeQuiz,
} from '@ltpx-frontend-apps/api';
import {
  Dropdown,
  Icon,
  QuizFormAnswer,
  QuizFormMultipleOptions,
} from '@ltpx-frontend-apps/shared-ui';
import { Dialog } from 'evergreen-ui';
import { useFormik } from 'formik';
import { useState } from 'react';
import Button, { ColorsButton, TypeButton } from '../button/button';
import Input from '../input/input';
import QuizFormConditional from '../quiz-form-conditional/quiz-form-conditional';
import styles from './quiz-builder.module.scss';

/* eslint-disable-next-line */
export interface QuizBuilderProps {
  open?: boolean;
  onClose?: () => void;
  onSave?: (quiz: QuizModel) => void;
  onSubmit?: (data: NewQuizParams) => void;
  nameQuiz?: string;
}

export function QuizBuilder(props: QuizBuilderProps) {
  const { open, onClose, onSave, onSubmit } = props;
  const [openTest, setOpenTest] = useState(false);
  const [questionsQuiz, setQuestionsQuiz] = useState<QuestionQuiz[]>([]);
  const [kindQuestion, setKindQuestion] = useState<TypeQuiz>();
  const [selectedTypeQuestion, setSelectedTypeQuestion] = useState<TypeQuiz>();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      questions: [],
    },
    onSubmit: (data) => {
      // onSubmit && onSubmit(data);
      // const elements = { ...data, ...{ questions: questionsQuiz } };
      // onSubmit && onSubmit(elements);
      // setOpenTest(false);
      // console.log(elements);
    },
  });

  const QuizDetailsForm = () => (
    <div>
      <Input
        label="Nombre del test"
        name="name"
        placeholder="Ejm: Test de clases"
        onChange={formik.handleChange}
        value={formik.values.name}
        onBlur={formik.handleBlur}
      />
      <Input
        label={'Description (Opcional)'}
        value={formik.values.description}
        placeholder="Un breve resumen de que trata este test"
        onChange={(e: any) => {
          formik.handleChange(e);
        }}
        name="description"
      />
    </div>
  );

  const HeaderQuiz = () => (
    <div className={styles['header']}>
      <div className={styles['text']}>
        <h3>Crear Test</h3>
      </div>
      <div className={styles['actions']}>
        <div className={styles['quiz-name']}>
          <h3>{formik.values.name}</h3>
        </div>
        <div className={styles['buttons']}>
          <Button
            title="Cancelar"
            outline={true}
            color={ColorsButton.secondary}
            onClick={() => {
              onClose && onClose();
            }}
          />
          <Button
            title="Guardar"
            color={ColorsButton.primary}
            type={TypeButton.submit}
            onClick={formik.submitForm}
          />
        </div>
      </div>
    </div>
  );

  const NavQuiz = () => (
    <div className={styles['side']}>
      <div className={styles['add-question']}>
        <h4>Preguntas</h4>
        <div className={styles['icon-container']}>
          <Icon icon="plus" size={18} />
        </div>
      </div>
      <div className={styles['questions']}>
        {questionsQuiz.map((question, index) => (
          <div className={styles['question']} key={index}>
            {question.question}
          </div>
        ))}
      </div>
    </div>
  );

  const ContentQuiz = () => (
    <div className={styles['content']}>
      {formik.values.name.length <= 0 && (
        <div className={styles['form-name']}>
          <Input label="Nombre del test" />
          <Button
            title="Continuar"
            full={true}
            className={styles['submit']}
            onClick={() => {
              formik.setFieldValue('name', 'Test 1');
            }}
          />
        </div>
      )}
      {formik.values.name.length > 0 && (
        <div className={styles['content-questions']}>
          <div className={styles['control-questions']}>
            <Dropdown>
              <div className={styles['select-questions']}>
                <h4>Seleccionar un tipo de pregunta</h4>
                <Icon icon="caret-down" size={18} />
              </div>
              <div className={`${styles['menu']} card`}>
                <div
                  className={styles['menu-option']}
                  onClick={() => {
                    setSelectedTypeQuestion(TypeQuiz.conditional);
                  }}
                >
                  Condicional
                </div>
                <div
                  className={styles['menu-option']}
                  onClick={() => {
                    setSelectedTypeQuestion(TypeQuiz.multiple);
                  }}
                >
                  Selección Multiple
                </div>
                <div
                  className={styles['menu-option']}
                  onClick={() => {
                    setSelectedTypeQuestion(TypeQuiz.single);
                  }}
                >
                  Una sola elección
                </div>
                <div
                  className={styles['menu-option']}
                  onClick={() => {
                    setSelectedTypeQuestion(TypeQuiz.answer);
                  }}
                >
                  Respuesta de usuario
                </div>
              </div>
            </Dropdown>
          </div>
          {!selectedTypeQuestion && (
            <div className={styles['empty-questions']}>
              <Icon icon="apps" size={70} />
              <h3>Por favor selecciona una pregunta </h3>
            </div>
          )}
        </div>
      )}
      {selectedTypeQuestion && <QuestionsQuiz />}
    </div>
  );

  const QuestionsQuiz = () => (
    <div className={styles['questions-quiz']}>
      {selectedTypeQuestion === TypeQuiz.conditional && (
        <QuizFormConditional
          onSubmit={(data) => {
            setOpenTest(false);
            console.log(data);
            setQuestionsQuiz(questionsQuiz.concat([data]));
          }}
          onCancel={() => {
            setOpenTest(false);
          }}
        />
      )}
      {selectedTypeQuestion === TypeQuiz.multiple && (
        <QuizFormMultipleOptions
          onSubmit={(data) => {
            setOpenTest(false);
            setQuestionsQuiz(questionsQuiz.concat([data]));
          }}
        />
      )}
      {selectedTypeQuestion === TypeQuiz.single && (
        <QuizFormMultipleOptions
          singleSelection={true}
          onSubmit={(data) => {
            setOpenTest(false);
            setQuestionsQuiz(questionsQuiz.concat([data]));
          }}
        />
      )}
      {selectedTypeQuestion === TypeQuiz.answer && (
        <QuizFormAnswer
          onCancel={() => {
            setOpenTest(false);
          }}
          onSubmit={(data) => {
            setOpenTest(false);
            setQuestionsQuiz(questionsQuiz.concat([data]));
          }}
        />
      )}
    </div>
  );

  return (
    <div className={styles['container']}>
      <Dialog
        isShown={open}
        hasFooter={false}
        hasHeader={false}
        onCloseComplete={() => onClose && onClose()}
        width={'80vw'}
        minHeightContent={'64vh'}
      >
        <form onSubmit={formik.submitForm}>
          <div className={styles['quiz-builder-layout']}>
            <HeaderQuiz />
            <NavQuiz />
            <ContentQuiz />
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default QuizBuilder;
