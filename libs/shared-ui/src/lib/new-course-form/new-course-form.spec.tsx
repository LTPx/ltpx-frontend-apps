import { render } from '@testing-library/react';

import NewCourseForm from './new-course-form';

describe('NewCourseForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewCourseForm />);
    expect(baseElement).toBeTruthy();
  });
});
