import { render } from '@testing-library/react';

import AchievementPaymentSystem from './achievement-payment-system';

describe('AchievementPaymentSystem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AchievementPaymentSystem />);
    expect(baseElement).toBeTruthy();
  });
});
