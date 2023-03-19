import { render } from '@testing-library/react';

import StudentClasses from './student-classes';

describe('StudentClasses', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudentClasses />);
    expect(baseElement).toBeTruthy();
  });
});
