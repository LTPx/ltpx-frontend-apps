import { render } from '@testing-library/react';
import AchievementByQuizzesForm from './achievement-by-quizzes-form';


describe('AchievementByQuizzesForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AchievementByQuizzesForm quizzes={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
