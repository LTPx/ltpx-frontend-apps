import { render } from '@testing-library/react';

import QuizAnswerQuestion from './quiz-answer-question';

describe('QuizAnswerQuestion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuizAnswerQuestion />);
    expect(baseElement).toBeTruthy();
  });
});
