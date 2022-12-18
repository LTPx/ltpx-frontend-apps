import { render } from '@testing-library/react';

import HeaderApp from './header-app';

describe('HeaderApp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeaderApp />);
    expect(baseElement).toBeTruthy();
  });
});
