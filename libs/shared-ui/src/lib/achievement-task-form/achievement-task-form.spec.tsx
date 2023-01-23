import { render } from '@testing-library/react';

import AchievementTaskForm from './achievement-task-form';

describe('AchievementTaskForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AchievementTaskForm />);
    expect(baseElement).toBeTruthy();
  });
});
