import { render } from '@testing-library/react';

import TeachersPage from './teachers-page';

describe('TeachersPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeachersPage />);
    expect(baseElement).toBeTruthy();
  });
});
