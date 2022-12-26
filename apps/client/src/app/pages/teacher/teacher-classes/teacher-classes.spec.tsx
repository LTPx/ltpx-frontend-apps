import { render } from '@testing-library/react';

import TeacherClasses from './teacher-classes';

describe('TeacherClasses', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherClasses />);
    expect(baseElement).toBeTruthy();
  });
});
