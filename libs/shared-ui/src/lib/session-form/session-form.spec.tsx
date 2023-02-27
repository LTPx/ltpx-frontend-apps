import { render } from '@testing-library/react';

import SessionForm from './session-form';

describe('SessionForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SessionForm />);
    expect(baseElement).toBeTruthy();
  });
});
