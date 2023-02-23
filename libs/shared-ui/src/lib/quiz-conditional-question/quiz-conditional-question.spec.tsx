import { render } from '@testing-library/react';

import QuizConditionalQuestion from './quiz-conditional-question';

describe('QuizConditionalQuestion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuizConditionalQuestion />);
    expect(baseElement).toBeTruthy();
  });
});
