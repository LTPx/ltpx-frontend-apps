import { render } from '@testing-library/react';

import MultipleOptionsQuiz from './multiple-options-quiz';

describe('MultipleOptionsQuiz', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MultipleOptionsQuiz />);
    expect(baseElement).toBeTruthy();
  });
});
