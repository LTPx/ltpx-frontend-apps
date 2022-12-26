import { render } from '@testing-library/react';

import NewCourse from './new-course';

describe('NewCourse', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewCourse />);
    expect(baseElement).toBeTruthy();
  });
});
