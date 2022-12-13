import { render } from '@testing-library/react';

import CourseCartItem from './course-cart-item';

describe('CourseCartItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CourseCartItem />);
    expect(baseElement).toBeTruthy();
  });
});
