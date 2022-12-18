import { render } from '@testing-library/react';

import ClassesCalendar from './classes-calendar';

describe('ClassesCalendar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClassesCalendar />);
    expect(baseElement).toBeTruthy();
  });
});
