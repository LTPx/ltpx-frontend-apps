import { render } from '@testing-library/react';

import QuizFormMultipleOptions from './quiz-form-multiple-options';

describe('QuizFormMultipleOptions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuizFormMultipleOptions />);
    expect(baseElement).toBeTruthy();
  });
});
