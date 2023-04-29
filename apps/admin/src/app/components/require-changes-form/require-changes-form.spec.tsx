import { render } from '@testing-library/react';

import RequireChangesForm from './require-changes-form';

describe('RequireChangesForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RequireChangesForm onCancel={function (): void {
      throw new Error('Function not implemented.');
    } } onSubmit={function (data: { comment: string; }): void {
      throw new Error('Function not implemented.');
    } } />);
    expect(baseElement).toBeTruthy();
  });
});
