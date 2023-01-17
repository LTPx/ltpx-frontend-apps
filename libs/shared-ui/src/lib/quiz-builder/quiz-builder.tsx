import { QuestionQuiz, QuizModel } from '@ltpx-frontend-apps/api';
import { useFormik } from 'formik';
import { useState } from 'react';
import Button, { ColorsButton, TypeButton } from '../button/button';
import Drawer from '../drawer/drawer';
import Input from '../input/input';
import PanelAccordion from '../panel-accordion/panel-accordion';
import QuizQuestion, { Question } from '../quiz-question/quiz-question';
import styles from './quiz-builder.module.scss';

/* eslint-disable-next-line */
export interface QuizBuilderProps {
  open?: boolean;
  onClose?: () => void;
  onSave?: (quiz: QuizModel) => void;
  nameQuiz?: string;
}

export function QuizBuilder(props: QuizBuilderProps) {
  const { open, onClose, onSave } = props;
  const [openTest, setOpenTest] = useState(false);
  const [questionsQuiz, setQuestionsQuiz] = useState<QuestionQuiz[]>([]);

  const formik = useFormik({
    initialValues: {
      question: '',
      kind: '',
      description: '',
      answers: [],
    },
    onSubmit: (data) => {
      console.log(data);
      const ff = { ...data, ...{ answers: [] } };
      setQuestionsQuiz(questionsQuiz.concat([ff]));
      setOpenTest(false);
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
              placeholder="Ingresar Titulo"
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              name="title"
            />
            <div className={styles['questions']}>
              {questionsQuiz.map((q) => (
                <PanelAccordion title={q.question}>
                  {q.description}
                </PanelAccordion>
              ))}
            </div>
            <Button
              title="+ Agregar pregunta"
              onClick={() => {
                setOpenTest(true);
              }}
              color={ColorsButton.primary}
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
              onClick={() => {
                onClose && onClose();
              }}
              title="Guardar"
            />
          </div>
        </div>
      </Drawer>
      <Drawer open={openTest}>
        <div className={styles['content']}>
          <div className={styles['quiz-form']}>
            <Input
              label={`Pregunta`}
              placeholder="Formula tu pregunta"
              value={formik.values.question}
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              name="question"
            />
            <Input
              label="Descripción (opcional)"
              placeholder="Alguna observación antes de responder esta pregunta"
              value={formik.values.description}
              onChange={(e: any) => {
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              name="description"
            />
            <div className={styles['quiz-question']}>
              <QuizQuestion
                kindQuestion={Question.answer}
                onChange={(value) => {
                  formik.setFieldValue('kind', value);
                }}
              />
            </div>
          </div>
          <div className={styles['footer']}>
            <Button
              color={ColorsButton.white}
              onClick={() => {
                setOpenTest(false);
              }}
              title="Cancelar"
            />
            <Button
              title="+ Guardar"
              type={TypeButton.submit}
              onClick={formik.handleSubmit}
              color={ColorsButton.primary}
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default QuizBuilder;
