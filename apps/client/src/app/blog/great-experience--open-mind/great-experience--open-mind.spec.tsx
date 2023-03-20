import { render } from '@testing-library/react';

import GreatExperienceOpenMind from './great-experience--open-mind';

describe('GreatExperienceOpenMind', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GreatExperienceOpenMind />);
    expect(baseElement).toBeTruthy();
  });
});
