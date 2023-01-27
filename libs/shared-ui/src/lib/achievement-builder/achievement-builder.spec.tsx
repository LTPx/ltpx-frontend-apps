import { render } from '@testing-library/react';

import AchievementBuilder from './achievement-builder';

describe('AchievementBuilder', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AchievementBuilder />);
    expect(baseElement).toBeTruthy();
  });
});
