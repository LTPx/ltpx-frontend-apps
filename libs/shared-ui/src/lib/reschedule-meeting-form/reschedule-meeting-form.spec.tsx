import { render } from '@testing-library/react';

import RescheduleMeetingForm from './reschedule-meeting-form';

describe('RescheduleMeetingForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RescheduleMeetingForm />);
    expect(baseElement).toBeTruthy();
  });
});
