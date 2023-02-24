import { render } from '@testing-library/react';

import StudentCourse from './student-course';

describe('StudentCourse', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudentCourse />);
    expect(baseElement).toBeTruthy();
  });
});
