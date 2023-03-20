import { render } from '@testing-library/react';

import StudentReviewQuiz from './student-review-quiz';

describe('StudentReviewQuiz', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudentReviewQuiz />);
    expect(baseElement).toBeTruthy();
  });
});
