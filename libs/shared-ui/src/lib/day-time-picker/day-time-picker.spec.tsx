import { render } from '@testing-library/react';

import DayTimePicker from './day-time-picker';

describe('DayTimePicker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DayTimePicker />);
    expect(baseElement).toBeTruthy();
  });
});
