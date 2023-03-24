import { render } from '@testing-library/react';

import AchievementBadge from './achievement-badge';

describe('AchievementBadge', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AchievementBadge />);
    expect(baseElement).toBeTruthy();
  });
});
