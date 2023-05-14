import { render } from '@testing-library/react';

import PopularCategories from './popular-categories';

describe('PopularCategories', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PopularCategories />);
    expect(baseElement).toBeTruthy();
  });
});
