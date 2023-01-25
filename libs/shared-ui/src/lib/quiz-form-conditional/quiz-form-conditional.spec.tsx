import { render } from '@testing-library/react';

import QuizFormConditional from './quiz-form-conditional';

describe('QuizFormConditional', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuizFormConditional />);
    expect(baseElement).toBeTruthy();
  });
});
