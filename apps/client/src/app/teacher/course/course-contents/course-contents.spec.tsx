import { render } from '@testing-library/react';

import CourseContents from './course-contents';

describe('CourseContents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CourseContents />);
    expect(baseElement).toBeTruthy();
  });
});
