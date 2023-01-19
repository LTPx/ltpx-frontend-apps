import { render } from '@testing-library/react';

import QuizFormAnswer from './quiz-form-answer';

describe('QuizFormAnswer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuizFormAnswer />);
    expect(baseElement).toBeTruthy();
  });
});
