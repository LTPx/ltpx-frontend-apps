import { render } from '@testing-library/react';

import TermsConditions from './terms-conditions';

describe('TermsConditions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TermsConditions />);
    expect(baseElement).toBeTruthy();
  });
});
