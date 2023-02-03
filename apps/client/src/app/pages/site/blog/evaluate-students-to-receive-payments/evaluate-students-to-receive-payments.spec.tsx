import { render } from '@testing-library/react';

import EvaluateStudentsToReceivePayments from './evaluate-students-to-receive-payments';

describe('EvaluateStudentsToReceivePayments', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EvaluateStudentsToReceivePayments />);
    expect(baseElement).toBeTruthy();
  });
});
