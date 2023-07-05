import { render } from '@testing-library/react';

import CourseCertificate from './course-certificate';

describe('CourseCertificate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CourseCertificate />);
    expect(baseElement).toBeTruthy();
  });
});
