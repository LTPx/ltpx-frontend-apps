import { render } from '@testing-library/react';

import CourseCounterCard from './course-counter-card';

describe('CourseCounterCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CourseCounterCard count={0} text={''} />);
    expect(baseElement).toBeTruthy();
  });
});
