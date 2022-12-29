import { render } from '@testing-library/react';

import CommentCourse from './comment-course';

describe('CommentCourse', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommentCourse reviewTitle={''} name={''} comment={''} date={''} image={''} />);
    expect(baseElement).toBeTruthy();
  });
});
