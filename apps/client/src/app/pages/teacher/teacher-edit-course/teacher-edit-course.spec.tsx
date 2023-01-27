import { render } from '@testing-library/react';

import TeacherEditCourse from './teacher-edit-course';

describe('TeacherEditCourse', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherEditCourse />);
    expect(baseElement).toBeTruthy();
  });
});
