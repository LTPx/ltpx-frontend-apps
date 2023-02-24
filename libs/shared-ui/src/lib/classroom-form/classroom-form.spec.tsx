import { render } from '@testing-library/react';

import ClassroomForm from './classroom-form';

describe('ClassroomForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClassroomForm />);
    expect(baseElement).toBeTruthy();
  });
});
