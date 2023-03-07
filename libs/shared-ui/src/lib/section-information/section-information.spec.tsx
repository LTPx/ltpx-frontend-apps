import { render } from '@testing-library/react';

import SectionInformation from './section-information';

describe('SectionInformation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SectionInformation />);
    expect(baseElement).toBeTruthy();
  });
});
