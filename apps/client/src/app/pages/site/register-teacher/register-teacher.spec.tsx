import { render } from '@testing-library/react';

import RegisterTeacher from './register-teacher';

describe('RegisterTeacher', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RegisterTeacher />);
    expect(baseElement).toBeTruthy();
  });
});
