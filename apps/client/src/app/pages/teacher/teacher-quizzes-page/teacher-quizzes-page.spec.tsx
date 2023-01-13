import { render } from '@testing-library/react';

import TeacherQuizzesPage from './teacher-quizzes-page';

describe('TeacherQuizzesPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherQuizzesPage />);
    expect(baseElement).toBeTruthy();
  });
});
