import { render } from '@testing-library/react';

import BlogHome from './blog-home';

describe('BlogHome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BlogHome />);
    expect(baseElement).toBeTruthy();
  });
});
