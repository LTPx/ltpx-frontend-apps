import { render } from '@testing-library/react';

import QuizMultiselectQuestion from './quiz-multiselect-question';

describe('QuizMultiselectQuestion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuizMultiselectQuestion />);
    expect(baseElement).toBeTruthy();
  });
});
