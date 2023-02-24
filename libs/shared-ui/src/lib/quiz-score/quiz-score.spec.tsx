import { render } from '@testing-library/react';

import QuizScore from './quiz-score';

describe('QuizScore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuizScore totalScore={0} message={''} />);
    expect(baseElement).toBeTruthy();
  });
});
