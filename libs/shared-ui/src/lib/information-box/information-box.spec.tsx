import { render } from '@testing-library/react';

import InformationBox from './information-box';

describe('InformationBox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InformationBox />);
    expect(baseElement).toBeTruthy();
  });
});
