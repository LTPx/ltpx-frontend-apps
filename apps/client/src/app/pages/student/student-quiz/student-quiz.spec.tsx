import { render } from '@testing-library/react';

import StudentQuiz from './student-quiz';

describe('StudentQuiz', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudentQuiz />);
    expect(baseElement).toBeTruthy();
  });
});
