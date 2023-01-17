import { render } from '@testing-library/react';

import SetupCard from './setup-card';

describe('SetupCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SetupCard />);
    expect(baseElement).toBeTruthy();
  });
});
