import { render } from '@testing-library/react';

import RatingCourse from './rating-course';

describe('RatingCourse', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RatingCourse ratings={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
