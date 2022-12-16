import { render } from '@testing-library/react';

import ClassCard from './class-card';

describe('ClassCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClassCard />);
    expect(baseElement).toBeTruthy();
  });
});
