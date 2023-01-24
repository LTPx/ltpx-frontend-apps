import {
  NewQuizParams,
  QuestionQuiz,
  TypeQuestionQuiz,
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


enum StatusQuestion {
  saved = 'saved',
  new = 'new'
}
interface QuestionNav {
  question?: QuestionQuiz;
  status: StatusQuestion;
  kind: TypeQuestionQuiz;
}

/* eslint-disable-next-line */
export interface QuizBuilderProps {
  open?: boolean;
  onClose?: () => void;
  onSave?: (quiz: NewQuizParams) => void;
  onSubmit?: (data: NewQuizParams) => void;
}

export function QuizBuilder(props: QuizBuilderProps) {
  const { open, onClose, onSave, onSubmit } = props;
  const [ quizName, setQuizName ] = useState<string>();
  const [ questionsQuiz, setQuestionsQuiz ] = useState<QuestionQuiz[]>([]);

  const [ selectedTypeQuestion, setSelectedTypeQuestion ] = useState<TypeQuestionQuiz | null>();
  const [ questions, setQuestions ] = useState<QuestionNav[]>([]);
  const elementRef = useRef<HTMLInputElement | null>(null);

  const handleNewQuestion = () => {
    const nav = {
      kind: selectedTypeQuestion || TypeQuestionQuiz.answer,
      status: StatusQuestion.new,
    }
    setQuestions(questions.concat([nav]));
  }

  const editQuestion = (index: number) => {
    console.log(questions[index]);
  }

  const handleSaveQuestionData = (question: any) => {
    const current = questions[questions.length - 1];
    questions[questions.length - 1] = {...current, ...{
      status: StatusQuestion.saved,
      question: question
    }};
    setQuestions(questions);
    setSelectedTypeQuestion(null);
    console.log('questions: ', questions);
  }

  const HeaderQuiz = () => (
    <div className={styles['header']}>
      <div className={styles['text']}>
        <h3>Crear Test</h3>
      </div>
      <div className={styles['actions']}>
        <div className={styles['quiz-name']}>
          <h3>{quizName}</h3>
        </div>
        <div className={styles['buttons']}>
          <Button
            title="Cancelar"
            outline={true}
            color={ColorsButton.white}
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
              const quiz = {
                name: quizName,
                questions: questions.map((q)=> q.question)
              }
              console.log('quiz: ', quiz);
              // onSave && onSave(quiz)
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
      </div>
      <div className={styles['questions']}>
        {questions.map((question, index) => (
          <div className={`${styles['question']} ${index === questionsQuiz.length ? styles['selected'] : ''}`}
            key={index}
            onClick={()=>{
              editQuestion(index);
            }}
          >
            <h4>Pregunta {index + 1}</h4>
            <h5>{question.status}</h5>
          </div>
        ))}
      </div>
    </div>
  );

  const ContentQuiz = () => (
    <div className={styles['content']}>
      {!quizName && (
        <div className={styles['form-name']}>
          <Input label="Nombre del test" refInput={elementRef}/>
          <Button
            title="Continuar"
            full={true}
            onClick={() => {
              setQuizName(elementRef.current?.value);
            }}
          />
        </div>
      )}
      {quizName && (
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
                    setSelectedTypeQuestion(TypeQuestionQuiz.conditional);
                    handleNewQuestion();
                  }}
                >
                  Condicional
                </div>
                <div
                  className={styles['menu-option']}
                  onClick={() => {
                    setSelectedTypeQuestion(TypeQuestionQuiz.multiple);
                    handleNewQuestion();
                  }}
                >
                  Selección Multiple
                </div>
                <div
                  className={styles['menu-option']}
                  onClick={() => {
                    setSelectedTypeQuestion(TypeQuestionQuiz.single);
                    handleNewQuestion();
                  }}
                >
                  Una sola elección
                </div>
                <div
                  className={styles['menu-option']}
                  onClick={() => {
                    setSelectedTypeQuestion(TypeQuestionQuiz.answer);
                    handleNewQuestion();
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
              <h3>Por favor selecciona un tipo pregunta </h3>
            </div>
          )}
        </div>
      )}
      {selectedTypeQuestion && <QuestionsQuiz />}
    </div>
  );

  const QuestionsQuiz = () => (
    <div className={styles['questions-quiz']}>
      {selectedTypeQuestion === TypeQuestionQuiz.conditional && (
        <QuizFormConditional
          onSubmit={(data) => {
            handleSaveQuestionData(data);
          }}
          onCancel={() => {
          }}
        />
      )}
      {selectedTypeQuestion === TypeQuestionQuiz.multiple && (
        <QuizFormMultipleOptions
          onSubmit={(data) => {
            handleSaveQuestionData(data);
          }}
        />
      )}
      {selectedTypeQuestion === TypeQuestionQuiz.single && (
        <QuizFormMultipleOptions
          singleSelection={true}
          onSubmit={(data) => {
            handleSaveQuestionData(data);
          }}
        />
      )}
      {selectedTypeQuestion === TypeQuestionQuiz.answer && (
        <QuizFormAnswer
          onCancel={() => {
          }}
          onSubmit={(data) => {
            handleSaveQuestionData(data);
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
        minHeightContent={'70vh'}
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
