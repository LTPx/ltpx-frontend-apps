import { render } from '@testing-library/react';

import UpcomingClass from './upcoming-class';

describe('UpcomingClass', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UpcomingClass />);
    expect(baseElement).toBeTruthy();
  });
});
