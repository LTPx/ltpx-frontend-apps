import { render } from '@testing-library/react';

import QuizReviewTeacher from './quiz-review-teacher';

describe('QuizReviewTeacher', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuizReviewTeacher />);
    expect(baseElement).toBeTruthy();
  });
});
