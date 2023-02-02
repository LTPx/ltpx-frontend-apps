import { render } from '@testing-library/react';

import AchievementsList from './achievements-list';

describe('AchievementsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AchievementsList />);
    expect(baseElement).toBeTruthy();
  });
});
