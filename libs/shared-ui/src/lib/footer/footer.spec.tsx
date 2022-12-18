import { render } from '@testing-library/react';

import Footer from './footer';

describe('Footer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Footer companyLinks={[]} supportLinks={[]}/>);
    expect(baseElement).toBeTruthy();
  });
});
