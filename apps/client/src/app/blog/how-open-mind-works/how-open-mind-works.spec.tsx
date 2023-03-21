import { render } from '@testing-library/react';

import HowOpenMindWorks from './how-open-mind-works';

describe('HowOpenMindWorks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HowOpenMindWorks />);
    expect(baseElement).toBeTruthy();
  });
});
