import { render } from '@testing-library/react';

import CourseContentForm from './course-content-form';

describe('CourseContentForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CourseContentForm />);
    expect(baseElement).toBeTruthy();
  });
});
