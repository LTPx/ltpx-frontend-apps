import { render } from '@testing-library/react';

import AchievementDetailsCard from './achievement-details-card';

describe('AchievementDetailsCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AchievementDetailsCard />);
    expect(baseElement).toBeTruthy();
  });
});
