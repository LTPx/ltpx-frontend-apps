import { render } from '@testing-library/react';

import InformationCard from './information-card';

describe('InformationCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InformationCard />);
    expect(baseElement).toBeTruthy();
  });
});
