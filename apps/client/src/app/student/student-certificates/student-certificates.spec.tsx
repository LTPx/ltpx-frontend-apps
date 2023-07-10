import { render } from '@testing-library/react';

import StudentCertificate from './student-certificates';

describe('StudentCertificate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudentCertificate />);
    expect(baseElement).toBeTruthy();
  });
});
