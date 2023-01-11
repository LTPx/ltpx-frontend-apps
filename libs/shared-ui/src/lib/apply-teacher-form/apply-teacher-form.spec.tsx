import { render } from '@testing-library/react';

import ApplyTeacherForm from './apply-teacher-form';

describe('ApplyTeacherForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApplyTeacherForm />);
    expect(baseElement).toBeTruthy();
  });
});
