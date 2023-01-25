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
import { useRef, useState } from 'react';
import Button, { ColorsButton, TypeButton } from '../button/button';
import Input from '../input/input';
import QuizFormConditional from '../quiz-form-conditional/quiz-form-conditional';
import styles from './quiz-builder.module.scss';

/* eslint-disable-next-line */
export interface QuizBuilderProps {
  onClose?: () => void;
  onSubmit?: (data: NewQuizParams) => void;
  className?: string;
}

export function QuizBuilder(props: QuizBuilderProps) {
  const { onClose, onSubmit, className } = props;
  const [ questionsQuiz, setQuestionsQuiz ] = useState<QuestionQuiz[]>([]);

  const [selectedTypeQuestion, setSelectedTypeQuestion] =
    useState<TypeQuestionQuiz | null>();
  const elementRef = useRef<HTMLInputElement>();

  const editQuestion = (index: number) => {
    // console.log(questions[index]);
  };

  const handleSaveQuestionData = (question: any) => {
    setQuestionsQuiz(questionsQuiz.concat([question]));
    setSelectedTypeQuestion(null);
    console.log('question: ', question);
  };

  const cancelQuestion = () => {
    setSelectedTypeQuestion(null);
  };

  const ContentQuizForm = () => (
    <div className={`${styles['content']} ${className}`}>
      <Input label="Nombre del test" refInput={elementRef} />
      <div className={styles['questions']}>
        <label> Preguntas</label>
        {questionsQuiz.map((question, index) => (
          <div
            className={`${styles['question']} ${
              index === questionsQuiz.length ? styles['selected'] : ''
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
      {!selectedTypeQuestion && questionsQuiz.length > 0 && (
        <div className={styles['footer']}>
          <Button
            title="Cancelar"
            color={ColorsButton.white}
            onClick={() => {
              onClose && onClose();
            }}
          />
          <Button
            title="Guardar test"
            color={ColorsButton.secondary}
            type={TypeButton.submit}
            onClick={() => {
              const quiz = {
                name: elementRef.current?.value || '',
                questions: questionsQuiz
              }
              onSubmit && onSubmit(quiz);
            }}
          />
        </div>
      )}
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
      <ContentQuizForm />
    </div>
  );
}

export default QuizBuilder;
