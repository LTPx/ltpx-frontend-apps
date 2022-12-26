import { render } from '@testing-library/react';

import ConditionalQuestionQuiz from './conditional-question-quiz';

describe('ConditionalQuestionQuiz', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConditionalQuestionQuiz />);
    expect(baseElement).toBeTruthy();
  });
});
