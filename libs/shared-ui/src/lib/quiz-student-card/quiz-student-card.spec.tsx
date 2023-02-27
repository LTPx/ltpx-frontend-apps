import { render } from '@testing-library/react';

import QuizStudentCard from './quiz-student-card';

describe('QuizStudentCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuizStudentCard />);
    expect(baseElement).toBeTruthy();
  });
});
