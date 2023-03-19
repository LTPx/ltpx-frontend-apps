import { render } from '@testing-library/react';

import StudentCourseQuizzes from './student-course-quizzes';

describe('StudentCourseQuizzes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudentCourseQuizzes />);
    expect(baseElement).toBeTruthy();
  });
});
