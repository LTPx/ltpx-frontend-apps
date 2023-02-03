import { render } from '@testing-library/react';

import EthicsManualForTeaching from './ethics-manual-for-teaching';

describe('EthicsManualForTeaching', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EthicsManualForTeaching />);
    expect(baseElement).toBeTruthy();
  });
});
