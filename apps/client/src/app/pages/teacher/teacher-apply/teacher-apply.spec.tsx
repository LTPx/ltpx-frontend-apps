import { render } from '@testing-library/react';

import TeacherApply from './teacher-apply';

describe('TeacherApply', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherApply />);
    expect(baseElement).toBeTruthy();
  });
});
