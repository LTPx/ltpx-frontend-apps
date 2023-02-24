import { render } from '@testing-library/react';

import CoursesPages from './courses-pages';

describe('CoursesPages', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CoursesPages />);
    expect(baseElement).toBeTruthy();
  });
});
