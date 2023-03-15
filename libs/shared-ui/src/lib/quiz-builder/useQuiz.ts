import { QuestionQuiz, TypeQuestionQuiz } from '@ltpx-frontend-apps/api';
import { useState } from 'react';

export const useQuiz = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [currentQuestion, setCurrentQuestion] = useState<QuestionQuiz>();
  const [questions, setQuestions] = useState<QuestionQuiz[]>([]);
  const typeQuestions = [
    {
      text: 'Condicional',
      onClick: () => {
        const question = { kind: TypeQuestionQuiz.conditional } as QuestionQuiz;
        setCurrentQuestion(question);
        setSelectedIndex(undefined);
      },
    },
    {
      text: 'Selección Multiple',
      onClick: () => {
        const question = { kind: TypeQuestionQuiz.multiple } as QuestionQuiz;
        setCurrentQuestion(question);
        setSelectedIndex(undefined);
      },
    },
    {
      text: 'Una sola elección',
      onClick: () => {
        const question = { kind: TypeQuestionQuiz.single } as QuestionQuiz;
        setCurrentQuestion(question);
        setSelectedIndex(undefined);
      },
    },
    {
      text: 'Respuesta de usuario',
      onClick: () => {
        const question = { kind: TypeQuestionQuiz.answer } as QuestionQuiz;
        setCurrentQuestion(question);
        setSelectedIndex(undefined);
      },
    },
  ];

  function addQuestion(question: QuestionQuiz) {
    return questions.concat([question]);
  }

  function updateQuestion(question: QuestionQuiz) {
    return questions.map((q, i) => (i === selectedIndex ? question : q));
  }

  function processQuestion(question: QuestionQuiz) {
    const result = selectedIndex ? updateQuestion(question) : addQuestion(question);
    setQuestions(result);
    setCurrentQuestion(undefined);
  }

  function removeQuestion() {
    const result = questions.filter((q, i) => i !== selectedIndex);
    setQuestions(result);
  }

  return {
    questions,
    processQuestion,
    removeQuestion,
    selectedIndex,
    typeQuestions,
    currentQuestion,
    setQuestions,
    setSelectedIndex,
    setCurrentQuestion,
  };
};
