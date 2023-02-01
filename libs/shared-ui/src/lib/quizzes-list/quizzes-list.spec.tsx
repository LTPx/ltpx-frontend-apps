import { render } from '@testing-library/react';

import QuizzesList from './quizzes-list';

describe('QuizzesList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuizzesList />);
    expect(baseElement).toBeTruthy();
  });
});
