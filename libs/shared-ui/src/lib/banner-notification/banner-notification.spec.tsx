import { render } from '@testing-library/react';

import BannerNotification from './banner-notification';

describe('BannerNotification', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BannerNotification />);
    expect(baseElement).toBeTruthy();
  });
});
