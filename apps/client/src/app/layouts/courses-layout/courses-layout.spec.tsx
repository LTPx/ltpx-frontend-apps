import { render } from '@testing-library/react';

import CoursesLayout from './courses-layout';

describe('CoursesLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CoursesLayout />);
    expect(baseElement).toBeTruthy();
  });
});
