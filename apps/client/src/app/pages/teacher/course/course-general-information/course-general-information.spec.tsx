import { render } from '@testing-library/react';

import CourseGeneralInformation from './course-general-information';

describe('CourseGeneralInformation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CourseGeneralInformation />);
    expect(baseElement).toBeTruthy();
  });
});
