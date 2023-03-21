import { render } from '@testing-library/react';

import StudentLayout from './student-layout';

describe('StudentLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudentLayout />);
    expect(baseElement).toBeTruthy();
  });
});
