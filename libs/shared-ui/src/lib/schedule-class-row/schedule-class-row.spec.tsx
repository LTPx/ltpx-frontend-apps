import { render } from '@testing-library/react';

import ScheduleClassRow from './schedule-class-row';

describe('ScheduleClassRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ScheduleClassRow />);
    expect(baseElement).toBeTruthy();
  });
});
