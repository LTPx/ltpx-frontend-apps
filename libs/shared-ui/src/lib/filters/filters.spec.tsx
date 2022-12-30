import { render } from '@testing-library/react';

import Filters from './filters';

describe('Filters', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Filters filters={[]} title={''} />);
    expect(baseElement).toBeTruthy();
  });
});
