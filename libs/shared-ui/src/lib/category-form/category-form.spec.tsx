import { render } from '@testing-library/react';

import CategoryForm from './category-form';

describe('CategoryForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CategoryForm />);
    expect(baseElement).toBeTruthy();
  });
});
