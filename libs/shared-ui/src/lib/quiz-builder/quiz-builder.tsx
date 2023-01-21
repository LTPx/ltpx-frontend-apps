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
import { useRef, useState } from 'react';
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
  const [ questionsQuiz, setQuestionsQuiz ] = useState<QuestionQuiz[]>([]);
  const [ kindQuestion, setKindQuestion ] = useState<TypeQuiz>();

  const [ selectedTypeQuestion, setSelectedTypeQuestion ] = useState<TypeQuiz | null>();
  const [ questions, setQuestions ] = useState<string[]>([]);
  const [ nameQuiz, setNameQuiz ] = useState<string>();
  const elementRef = useRef<HTMLInputElement | null>(null);

  const handleTotalQuestions = (kind: string) => {
    if (!selectedTypeQuestion) {
      setQuestions(questions.concat([kind]));
    }
  }

  const HeaderQuiz = () => (
    <div className={styles['header']}>
      <div className={styles['text']}>
        <h3>Crear Test</h3>
      </div>
      <div className={styles['actions']}>
        <div className={styles['quiz-name']}>
          <h3>{nameQuiz}</h3>
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
            onClick={()=> {
              console.log('guardando...');
            }}
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
        {questions.map((question, index) => (
          <div className={styles['question']} key={index}>
            <h4>Pregunta {index + 1}</h4>
            <h5>{question}</h5>
          </div>
        ))}
      </div>
    </div>
  );

  const ContentQuiz = () => (
    <div className={styles['content']}>
      {!nameQuiz && (
        <div className={styles['form-name']}>
          <Input label="Nombre del test" refInput={elementRef}/>
          <Button
            title="Continuar"
            full={true}
            onClick={() => {
              setNameQuiz(elementRef.current?.value);
            }}
          />
        </div>
      )}
      {nameQuiz && (
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
                    handleTotalQuestions('condicional');
                  }}
                >
                  Condicional
                </div>
                <div
                  className={styles['menu-option']}
                  onClick={() => {
                    setSelectedTypeQuestion(TypeQuiz.multiple);
                    handleTotalQuestions('multiple');
                  }}
                >
                  Selección Multiple
                </div>
                <div
                  className={styles['menu-option']}
                  onClick={() => {
                    setSelectedTypeQuestion(TypeQuiz.single);
                    handleTotalQuestions('una sola elección');
                  }}
                >
                  Una sola elección
                </div>
                <div
                  className={styles['menu-option']}
                  onClick={() => {
                    setSelectedTypeQuestion(TypeQuiz.answer);
                    handleTotalQuestions('respuesta de usuario');
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
            console.log(data);
            setQuestionsQuiz(questionsQuiz.concat([data]));
            setSelectedTypeQuestion(null);
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
        <div className={styles['quiz-builder-layout']}>
          <HeaderQuiz />
          <NavQuiz />
          <ContentQuiz />
        </div>
      </Dialog>
    </div>
  );
}

export default QuizBuilder;
