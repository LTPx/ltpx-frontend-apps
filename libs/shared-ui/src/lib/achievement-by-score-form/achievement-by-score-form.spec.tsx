import { render } from '@testing-library/react';

import AchievementByScoreForm from './achievement-by-score-form';

describe('AchievementByScoreForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AchievementByScoreForm />);
    expect(baseElement).toBeTruthy();
  });
});
