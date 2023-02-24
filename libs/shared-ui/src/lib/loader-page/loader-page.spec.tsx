import { render } from '@testing-library/react';

import LoaderPage from './loader-page';

describe('LoaderPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoaderPage />);
    expect(baseElement).toBeTruthy();
  });
});
