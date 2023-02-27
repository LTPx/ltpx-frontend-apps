import { render } from '@testing-library/react';

import CourseDateCard from './course-date-card';

describe('CourseDateCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CourseDateCard />);
    expect(baseElement).toBeTruthy();
  });
});
