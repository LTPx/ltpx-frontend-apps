import { render } from '@testing-library/react';

import TeacherProfileGuidelines from './teacher-profile-guidelines';

describe('TeacherProfileGuidelines', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherProfileGuidelines />);
    expect(baseElement).toBeTruthy();
  });
});
