import { render } from '@testing-library/react';

import ApplicationDetailsPage from './application-details-page';

describe('ApplicationDetailsPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApplicationDetailsPage />);
    expect(baseElement).toBeTruthy();
  });
});
