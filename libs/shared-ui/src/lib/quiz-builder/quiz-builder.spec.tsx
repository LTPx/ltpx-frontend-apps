import { render } from '@testing-library/react';

import QuizBuilder from './quiz-builder';

describe('QuizBuilder', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuizBuilder />);
    expect(baseElement).toBeTruthy();
  });
});
