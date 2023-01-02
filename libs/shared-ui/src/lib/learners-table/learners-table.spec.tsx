import { render } from '@testing-library/react';

import LearnersTable from './learners-table';

describe('LearnersTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LearnersTable users={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
