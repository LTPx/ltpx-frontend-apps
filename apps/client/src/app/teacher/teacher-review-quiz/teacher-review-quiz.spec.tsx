import { render } from '@testing-library/react';

import TeacherReviewQuiz from './teacher-review-quiz';

describe('TeacherReviewQuiz', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherReviewQuiz />);
    expect(baseElement).toBeTruthy();
  });
});
