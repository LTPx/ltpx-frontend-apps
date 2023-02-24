import { render } from '@testing-library/react';

import NewClassForm from './new-class-form';

describe('NewClassForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewClassForm />);
    expect(baseElement).toBeTruthy();
  });
});
