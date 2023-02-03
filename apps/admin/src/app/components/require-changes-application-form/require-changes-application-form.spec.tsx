import { render } from '@testing-library/react';

import RequireChangesApplicationForm from './require-changes-application-form';

describe('RequireChangesApplicationForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RequireChangesApplicationForm />);
    expect(baseElement).toBeTruthy();
  });
});
