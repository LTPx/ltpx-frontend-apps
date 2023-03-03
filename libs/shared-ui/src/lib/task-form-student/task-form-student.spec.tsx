import { render } from '@testing-library/react';

import TaskFormStudent from './task-form-student';

describe('TaskFormStudent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TaskFormStudent />);
    expect(baseElement).toBeTruthy();
  });
});
