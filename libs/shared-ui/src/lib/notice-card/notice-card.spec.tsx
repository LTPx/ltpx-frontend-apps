import { render } from '@testing-library/react';

import NoticeCard from './notice-card';

describe('NoticeCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NoticeCard />);
    expect(baseElement).toBeTruthy();
  });
});
