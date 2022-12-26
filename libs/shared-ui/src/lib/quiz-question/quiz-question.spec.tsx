import { render } from '@testing-library/react';

import QuizQuestion from './quiz-question';

describe('QuizQuestion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuizQuestion />);
    expect(baseElement).toBeTruthy();
  });
});
