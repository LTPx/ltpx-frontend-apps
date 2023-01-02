import { render } from '@testing-library/react';

import QuestionOneOption from './question-one-option';

describe('QuestionOneOption', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuestionOneOption />);
    expect(baseElement).toBeTruthy();
  });
});
