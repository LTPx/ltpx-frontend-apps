import { render } from '@testing-library/react';

import ReviewCourseForm from './review-course-form';

describe('ReviewCourseForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReviewCourseForm />);
    expect(baseElement).toBeTruthy();
  });
});
