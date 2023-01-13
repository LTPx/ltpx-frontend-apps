import { render } from '@testing-library/react';

import ApplicationView from './application-view';

describe('ApplicationView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApplicationView />);
    expect(baseElement).toBeTruthy();
  });
});
