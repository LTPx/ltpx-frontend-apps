import { render } from '@testing-library/react';

import RemovalOfTeachers from './removal-of-teachers';

describe('RemovalOfTeachers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RemovalOfTeachers />);
    expect(baseElement).toBeTruthy();
  });
});
