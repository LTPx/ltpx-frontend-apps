import { render } from '@testing-library/react';

import QuizQuestionView from './quiz-question-view';

describe('QuizQuestionView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuizQuestionView />);
    expect(baseElement).toBeTruthy();
  });
});
