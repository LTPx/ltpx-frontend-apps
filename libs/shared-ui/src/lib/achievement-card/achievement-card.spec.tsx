import { render } from '@testing-library/react';

import AchievementCard from './achievement-card';

describe('AchievementCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AchievementCard image={''} text={''} />);
    expect(baseElement).toBeTruthy();
  });
});
