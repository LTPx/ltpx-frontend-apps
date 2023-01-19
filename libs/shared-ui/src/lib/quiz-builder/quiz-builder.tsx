import {
  NewQuizParams,
  QuestionQuiz,
  QuizModel,
  TypeQuiz,
} from '@ltpx-frontend-apps/api';
import {
  QuizFormAnswer,
  QuizFormMultipleOptions,
} from '@ltpx-frontend-apps/shared-ui';
import { useFormik } from 'formik';
import { useState } from 'react';
import Button, { ColorsButton, TypeButton } from '../button/button';
import Drawer from '../drawer/drawer';
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

  const formik = useFormik({
    initialValues: {
      name: '',
      questions: [],
    },
    onSubmit: (data) => {
      onSubmit && onSubmit(data);
      const elements = { ...data, ...{ questions: questionsQuiz } };
      onSubmit && onSubmit(elements);
      setOpenTest(false);
      console.log(elements);
    },
  });

  return (
    <div className={styles['container']}>
      <Drawer
        open={open}
        onClose={() => {
          onClose && onClose();
        }}
      >
        <div className={styles['content']}>
          <div className={styles['title']}>
            <h2>Banco de Preguntas </h2>
            <Input
              className={styles['input']}
              label={`Titulo de Examen`}
              value={formik.values.name}
              placeholder="Ingresar Titulo"
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              name="name"
            />
            {/* <div className={styles['questions']}>
              {questionsQuiz.map((q, key) => (
                <div key={key}>
                  <h4>{q.question}</h4>
                  <h4>{q.description}</h4>
                  <div>
                    {q.answers.map((ele, key) => (
                      <div key={key}>
                        <h4>{ele.correct ? 'true' : 'false'}</h4>
                        <h4>{ele.text}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div> */}
            <Button
              title="+ Agregar pregunta verdadera / falsa"
              color={ColorsButton.primary}
              onClick={() => {
                setOpenTest(true);
                setKindQuestion(TypeQuiz.conditional);
              }}
            />
            <Button
              title="+ Agregar pregunta selección multiple"
              color={ColorsButton.primary}
              onClick={() => {
                setOpenTest(true);
                setKindQuestion(TypeQuiz.multiple);
              }}
            />
            <Button
              title="+ Agregar pregunta de una selección"
              color={ColorsButton.primary}
              onClick={() => {
                setOpenTest(true);
                setKindQuestion(TypeQuiz.single);
              }}
            />
            <Button
              title="+ Agregar pregunta"
              color={ColorsButton.primary}
              onClick={() => {
                setOpenTest(true);
                setKindQuestion(TypeQuiz.answer);
              }}
            />
          </div>
          <div className={styles['footer']}>
            <Button
              color={ColorsButton.white}
              onClick={() => {
                onClose && onClose();
              }}
              title="Cancelar"
            />
            <Button
              type={TypeButton.submit}
              onClick={formik.submitForm}
              title="Guardar"
            />
          </div>
        </div>
      </Drawer>
      <Drawer
        open={openTest}
        onClose={() => {
          setOpenTest(false);
        }}
      >
        <div className={styles['content']}>
          <div className={styles['quiz-form']}>
            {kindQuestion === TypeQuiz.conditional && (
              <QuizFormConditional
                onSubmit={(data) => {
                  setOpenTest(false);
                  setQuestionsQuiz(questionsQuiz.concat([data]));
                }}
                onCancel={() => {
                  setOpenTest(false);
                }}
              />
            )}
            {kindQuestion === TypeQuiz.multiple && (
              <QuizFormMultipleOptions
                onCancel={() => {
                  setOpenTest(false);
                }}
                onSubmit={(data) => {
                  setOpenTest(false);
                  setQuestionsQuiz(questionsQuiz.concat([data]));
                }}
              />
            )}
            {kindQuestion === TypeQuiz.single && (
              <QuizFormMultipleOptions
                onCancel={() => {
                  setOpenTest(false);
                }}
                singleSelection={true}
                onSubmit={(data) => {
                  setOpenTest(false);
                  setQuestionsQuiz(questionsQuiz.concat([data]));
                }}
              />
            )}
            {kindQuestion === TypeQuiz.answer && (
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
        </div>
      </Drawer>
    </div>
  );
}

export default QuizBuilder;
