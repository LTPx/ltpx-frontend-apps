import { render } from '@testing-library/react';

import Page404 from './page-404';

describe('Page404', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Page404 />);
    expect(baseElement).toBeTruthy();
  });
});
