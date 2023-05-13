import { render } from '@testing-library/react';

import CategoryPage from './category-page';

describe('CategoryPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CategoryPage />);
    expect(baseElement).toBeTruthy();
  });
});
