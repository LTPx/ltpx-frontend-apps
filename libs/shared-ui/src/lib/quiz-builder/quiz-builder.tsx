import { QuestionQuiz, QuizModel, TypeQuiz } from '@ltpx-frontend-apps/api';
import { QuizFormMultipleOptions } from '@ltpx-frontend-apps/shared-ui';
import { useFormik } from 'formik';
import { useState } from 'react';
import Button, { ColorsButton } from '../button/button';
import Drawer from '../drawer/drawer';
import Input from '../input/input';
import PanelAccordion from '../panel-accordion/panel-accordion';
import QuizFormConditional from '../quiz-form-conditional/quiz-form-conditional';
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
  const [ questionsQuiz, setQuestionsQuiz] = useState<QuestionQuiz[]>([]);
  const [kindQuestion, setKindQuestion] = useState<TypeQuiz>();

  const formik = useFormik({
    initialValues: {
      question: '',
      kind: '',
      description: '',
      answers: [],
    },
    onSubmit: (data) => {
      console.log(data);
      // const ff = { ...data, ...{ answers: [] } };
      // setQuestionsQuiz(questionsQuiz.concat([ff]));
      // setOpenTest(false);
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
              {questionsQuiz.map((q, key) => (
                <PanelAccordion title={q.question} key={key}>
                  {q.description}
                </PanelAccordion>
              ))}
            </div>
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
      <Drawer open={openTest} onClose={()=>{
        setOpenTest(false);
      }}>
        <div className={styles['content']}>
          <div className={styles['quiz-form']}>
            {kindQuestion === TypeQuiz.conditional && (
              <QuizFormConditional
                onSubmit={(data) => {
                  setOpenTest(false);
                  setQuestionsQuiz(questionsQuiz.concat([data]));
                  console.log('data from conditional form: ', data);
                }}
                onCancel={() => {
                  setOpenTest(false);
                }}
              />
            )}
            {kindQuestion === TypeQuiz.multiple && (
              <QuizFormMultipleOptions/>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default QuizBuilder;
