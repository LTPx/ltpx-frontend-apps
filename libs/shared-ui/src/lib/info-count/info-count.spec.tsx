import { render } from '@testing-library/react';

import InfoCount from './info-count';

describe('InfoCount', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InfoCount count={0} text={''} />);
    expect(baseElement).toBeTruthy();
  });
});
