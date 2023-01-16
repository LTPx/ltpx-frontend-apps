import { render } from '@testing-library/react';

import OverviewCourse from './overview-course';

describe('OverviewCourse', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OverviewCourse />);
    expect(baseElement).toBeTruthy();
  });
});
