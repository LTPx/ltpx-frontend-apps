import { render } from '@testing-library/react';

import TaskForm from './task-form';

describe('TaskForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TaskForm />);
    expect(baseElement).toBeTruthy();
  });
});
