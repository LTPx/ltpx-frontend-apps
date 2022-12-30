import { render } from '@testing-library/react';

import QuizProgressCard from './quiz-progress-card';

describe('QuizProgressCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuizProgressCard percentage={0} text={''} />);
    expect(baseElement).toBeTruthy();
  });
});
