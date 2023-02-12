import { render } from '@testing-library/react';

import WelcomeNewTeacher from './welcome-new-teacher';

describe('WelcomeNewTeacher', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WelcomeNewTeacher />);
    expect(baseElement).toBeTruthy();
  });
});
