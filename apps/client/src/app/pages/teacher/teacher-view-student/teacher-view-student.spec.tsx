import { render } from '@testing-library/react';

import TeacherViewStudent from './teacher-view-student';

describe('TeacherViewStudent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherViewStudent />);
    expect(baseElement).toBeTruthy();
  });
});
