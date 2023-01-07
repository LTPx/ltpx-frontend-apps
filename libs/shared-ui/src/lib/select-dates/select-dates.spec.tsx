import { render } from '@testing-library/react';

import SelectDates from './select-dates';

describe('SelectDates', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SelectDates />);
    expect(baseElement).toBeTruthy();
  });
});
