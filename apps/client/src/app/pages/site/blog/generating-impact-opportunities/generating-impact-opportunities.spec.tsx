import { render } from '@testing-library/react';

import GeneratingImpactOpportunities from './generating-impact-opportunities';

describe('GeneratingImpactOpportunities', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GeneratingImpactOpportunities />);
    expect(baseElement).toBeTruthy();
  });
});
