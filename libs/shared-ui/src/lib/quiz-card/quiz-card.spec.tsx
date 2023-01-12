import { render } from '@testing-library/react';

import QuizCard from './quiz-card';

describe('QuizCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuizCard />);
    expect(baseElement).toBeTruthy();
  });
});
