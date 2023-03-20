import { render } from '@testing-library/react';

import TeacherEarnings from './teacher-earnings';

describe('TeacherEarnings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeacherEarnings />);
    expect(baseElement).toBeTruthy();
  });
});
